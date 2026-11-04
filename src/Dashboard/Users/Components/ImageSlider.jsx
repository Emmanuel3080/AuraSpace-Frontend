import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Context/userContext";
import EventCard from "../../../Component/EventCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUpIcon,
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "../../../Common/Icons";


const ImageSlider = () => {
  const { displayEvents, showEvents } = useContext(authContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    displayEvents();
  }, []);

  const eventsList = Array.isArray(showEvents) ? showEvents : [];

  const filteredEvents =
    selectedCategory === "All"
      ? eventsList
      : eventsList.filter(
          (eve) =>
            eve.category &&
            eve.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const trendingEvents = eventsList.slice(0, 3);

  return (
    <div className="w-full bg-[#F7F6F2] py-16 px-4 sm:px-6 lg:px-8 space-y-24 max-w-7xl mx-auto">

      {/* 2. Trending Events (Featured Row) */}
      {trendingEvents.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#F45B69]/10 text-[#F45B69]">
                <TrendingUpIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                  Trending Now
                </h2>
                <p className="text-xs sm:text-sm text-[#737783]">
                  Most popular experiences selling out fast
                </p>
              </div>
            </div>

            <Link
              to="/events"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827] hover:text-[#8065E8] transition-colors no-underline group"
            >
              <span>See more</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trendingEvents.map((eve) => (
              <EventCard key={eve._id} event={eve} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Upcoming Events Catalog Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E9E7]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-[#737783] mt-0.5">
              Curated live gatherings, meetups, and summits
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {["All", "Music", "Technology", "Business", "Entertainment"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                      : "bg-white text-[#737783] border-[#E9E9E7] hover:border-[#111827] hover:text-[#111827]"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Grid Content */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E9E9E7] p-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#E9E9E7] flex items-center justify-center text-[#737783]">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">
              No events found in this category
            </h3>
            <p className="text-sm text-[#737783] max-w-sm mx-auto">
              Check back soon or explore other exciting categories.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#111827] text-white hover:bg-[#8065E8] transition-colors border-0 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredEvents.map((eve) => (
              <motion.div
                key={eve._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4 }}
              >
                <EventCard event={eve} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center pt-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111827] text-white font-semibold text-sm hover:bg-[#8065E8] shadow-md hover:shadow-lg transition-all no-underline"
          >
            <span>Explore All Events</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ImageSlider;
