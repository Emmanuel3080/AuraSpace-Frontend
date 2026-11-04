import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { authContext } from "../../Context/userContext";
import EventCard from "../../Component/EventCard";
import { motion } from "framer-motion";
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  TagIcon,
  SparklesIcon,
} from "../../Common/Icons";

const CATEGORIES = [
  "All",
  "Music",
  "Technology",
  "Business",
  "Education",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Arts",
];

const AllEventsPage = () => {
  const { displayEvents, showEvents } = useContext(authContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [querys, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [eventPrice, setEventPrice] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userSearched, setHasUserSearched] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

  useEffect(() => {
    displayEvents();
  }, []);

  // Update query when searchParams change (e.g. from Hero navigation)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "All";
    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (querys.trim() || eventPrice) {
        searchEvents(querys, eventPrice);
      } else {
        setFilteredEvents([]);
        setHasUserSearched(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [querys, eventPrice]);

  const searchEvents = async (keyword, maxPrice) => {
    setIsSearching(true);
    setHasUserSearched(true);
    try {
      const queryParams = new URLSearchParams();
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (keyword) queryParams.append("querys", keyword);

      const response = await fetch(
        `${baseUrl}/user/event/search?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );
      const data = await response.json();
      if (data.Status === "Success") {
        setFilteredEvents(data?.events || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  // Base list depending on search or showEvents
  const eventsList = Array.isArray(showEvents) ? showEvents : [];
  const baseList = userSearched
    ? (Array.isArray(filteredEvents) ? filteredEvents : [])
    : eventsList;

  // Apply client-side category filter
  const displayedEvents =
    selectedCategory === "All"
      ? baseList
      : baseList.filter(
          (eve) =>
            eve.category &&
            eve.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setEventPrice("");
    setFilteredEvents([]);
    setHasUserSearched(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Top Page Header */}
        <div className="space-y-4 text-center sm:text-left max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8065E8]/10 text-xs font-bold uppercase tracking-wider text-[#8065E8]">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Curated Event Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Explore All Events
          </h1>
          <p className="text-base text-[#737783] leading-relaxed">
            Discover upcoming concerts, tech summits, exhibitions, and parties happening near you.
          </p>
        </div>

        {/* Filter Controls Console */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E9E9E7] shadow-sm space-y-5">
          {/* Search Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Keyword Input */}
            <div className="sm:col-span-8 flex items-center gap-3 px-4 py-3 bg-[#F7F6F2] rounded-2xl border border-transparent focus-within:border-[#8065E8] transition-colors">
              <SearchIcon className="w-5 h-5 text-[#737783] flex-shrink-0" />
              <input
                type="text"
                value={querys}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event title, venue, or keyword..."
                className="w-full bg-transparent border-0 outline-none text-sm text-[#111827] placeholder-[#737783] font-medium"
              />
              {querys && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#737783] hover:text-[#111827] font-semibold bg-transparent border-0 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Max Price Filter */}
            <div className="sm:col-span-4 flex items-center gap-3 px-4 py-3 bg-[#F7F6F2] rounded-2xl border border-transparent focus-within:border-[#8065E8] transition-colors">
              <span className="text-xs font-bold text-[#737783] uppercase flex-shrink-0">
                Max ₦
              </span>
              <input
                type="number"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full bg-transparent border-0 outline-none text-sm text-[#111827] placeholder-[#737783] font-medium"
              />
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#E9E9E7]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737783] pr-2 flex items-center gap-1 flex-shrink-0">
              <TagIcon className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                    : "bg-[#F7F6F2] text-[#737783] border-[#E9E9E7] hover:border-[#111827] hover:text-[#111827]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#737783]">
          <p>
            Showing <strong className="text-[#111827]">{displayedEvents.length}</strong> events
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>

          {(querys || eventPrice || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#8065E8] hover:text-[#F45B69] transition-colors bg-transparent border-0 cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Shimmer Skeleton or Event Grid */}
        {isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-[#E9E9E7] p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] bg-[#E9E9E7] rounded-2xl w-full" />
                <div className="h-4 bg-[#E9E9E7] rounded w-2/3" />
                <div className="h-6 bg-[#E9E9E7] rounded w-full" />
                <div className="h-4 bg-[#E9E9E7] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-[#E9E9E7] p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#737783]">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#111827]">No events found</h3>
            <p className="text-sm text-[#737783] leading-relaxed">
              We couldn't find any events matching your selected criteria. Try adjusting your keyword or filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-[#8065E8] transition-colors border-0 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {displayedEvents.map((eve) => (
              <EventCard key={eve._id} event={eve} />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllEventsPage;
