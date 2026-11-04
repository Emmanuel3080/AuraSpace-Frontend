import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../Context/userContext";
import { motion } from "framer-motion";
import {
  SearchIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  ArrowRightIcon,
  SparklesIcon,
  TicketIcon,
} from "../../../Common/Icons";

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

const HeroSection = () => {
  const { showEvents } = useContext(authContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (selectedLocation.trim()) params.append("location", selectedLocation.trim());
    if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
    navigate(`/events?${params.toString()}`);
  };

  const featuredEvent =
    Array.isArray(showEvents) && showEvents.length > 0 ? showEvents[0] : null;

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F7F6F2]">
      {/* Background subtle ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#8065E8]/10 via-[#F45B69]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Search */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-[1.1] tracking-tight">
                Find your next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8065E8] via-[#F45B69] to-[#8065E8]">
                  unforgettable
                </span>{" "}
                experience.
              </h1>

              <p className="text-lg sm:text-xl text-[#737783] max-w-xl font-normal leading-relaxed">
                Discover events, connect with people and experience something extraordinary. Curated experiences and instant ticketing right at your fingertips.
              </p>
            </motion.div>

            {/* Unified Search Filter Console (Luma / DICE style) */}
            <motion.form
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={handleSearchSubmit}
              className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl shadow-[#111827]/5 border border-[#E9E9E7] space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2"
            >
              {/* Event Keyword Input */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-[#F7F6F2] rounded-2xl border border-transparent focus-within:border-[#8065E8] transition-colors">
                <SearchIcon className="w-5 h-5 text-[#737783] flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Concert, conference, workshop..."
                  className="w-full bg-transparent border-0 outline-none text-sm text-[#111827] placeholder-[#737783] font-medium"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-[#F7F6F2] rounded-2xl border border-transparent focus-within:border-[#8065E8] transition-colors">
                <MapPinIcon className="w-5 h-5 text-[#737783] flex-shrink-0" />
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="City, venue, or online"
                  className="w-full bg-transparent border-0 outline-none text-sm text-[#111827] placeholder-[#737783] font-medium"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#8065E8] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0 border-0 cursor-pointer"
              >
                <span>Discover</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </motion.form>

            {/* Quick Filter Categories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[#737783]">
                Popular:
              </span>
              {["Music", "Technology", "Business", "Entertainment"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => navigate(`/events?category=${cat}`)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-[#E9E9E7] text-[#111827] hover:border-[#8065E8] hover:text-[#8065E8] transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Featured Event Card (DICE-inspired aesthetic) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative group"
            >
              {featuredEvent ? (
                <Link
                  to={`/event/${featuredEvent._id}`}
                  className="block relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#111827]/10 border border-[#E9E9E7] transition-all duration-500 hover:-translate-y-1.5 no-underline"
                >
                  {/* Event Cover Image */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#111827]">
                    <img
                      src={featuredEvent.coverImage}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F45B69] text-white shadow-md">
                        Featured
                      </span>
                      {featuredEvent.category && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                          {featuredEvent.category}
                        </span>
                      )}
                    </div>

                    {/* Pricing Pill */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#111827] shadow-sm">
                      {featuredEvent.price ? `₦${Number(featuredEvent.price).toLocaleString()}` : "Free"}
                    </div>

                    {/* Overlaid Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#F45B69]" />
                        <span>{featuredEvent.eventDate || "Upcoming Date"}</span>
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white line-clamp-1">
                        {featuredEvent.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Detail Strip */}
                  <div className="p-4 sm:p-5 bg-white flex items-center justify-between border-t border-[#E9E9E7]">
                    <div className="flex items-center gap-2 text-sm text-[#737783] max-w-[240px] truncate">
                      <MapPinIcon className="w-4 h-4 text-[#8065E8] flex-shrink-0" />
                      <span className="truncate">{featuredEvent.location || "Location not specified"}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#8065E8] group-hover:text-[#F45B69] transition-colors">
                      <span>Get Ticket</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="rounded-3xl p-8 bg-white border border-[#E9E9E7] shadow-xl text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8065E8]/10 flex items-center justify-center text-[#8065E8]">
                    <TicketIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827]">Discover Live Events</h3>
                  <p className="text-sm text-[#737783]">
                    Explore concerts, tech summits, workshops, and exclusive parties across top cities.
                  </p>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white text-sm font-semibold hover:bg-[#8065E8] transition-colors no-underline"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
