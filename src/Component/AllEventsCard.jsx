import React from "react";
import { Link } from "react-router-dom";

const AllEventsCard = ({
  title,
  location,
  eventId,
  image,
  formattedDate,
  formmattedTime,
}) => {
  const formatTime = (time) => {
    if (!time) return "oooooo";
    const [hrs, minute] = time.split(":");
    const date = new Date();
    date.setHours(hrs);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const dateFormat = formatTime(formmattedTime);
  return (
    <Link
      to={`/event/${eventId}`}
      className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 no-underline"
    >
      {/* Event Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image || "/fallback-event.jpg"}
          alt={title}
          className="w-full h-100 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Location badge */}
        <div className="absolute bottom-2 left-2 bg-[#111827]/70 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-white/10 w-fit flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#8065E8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-xs text-white font-medium tracking-wide truncate max-w-[200px]">
            {location || "Location not specified"}
          </span>
        </div>

      </div>

      {/* Event Info */}
      <div className="p-3 ">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500">
          {formattedDate}<span className="text-right"> {formmattedTime || ""}</span>
        </p>

        {/* <div className="pt-2">
          <button className="text-sm text-indigo-600 font-medium group-hover:text-purple-600 transition">
            View Details →
          </button>
        </div> */}
      </div>
    </Link>
  );
};

export default AllEventsCard;
