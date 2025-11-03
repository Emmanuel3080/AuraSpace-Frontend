import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ image, title, location, eventId, eventdate }) => {
  const eventTime = new Date(eventdate).getTime();
  const hasEventPassed = eventTime < Date.now();
  const formattedDate = !hasEventPassed
    ? new Date(eventdate).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div>
      <Link
        to={`/event/${eventId}`}
        className="group block bg-gradient-to-br no-underline from-indigo-50 via-white to-purple-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      >
        {/* Event Image + Overlay */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-100 h-100 object-cover transform transition-transform duration-700 group-hover:scale-110"
          />

          {/* Top overlay (Location badge) */}
          <div className="absolute top-0 left-0 bg-white/15 backdrop-blur-sm px-1 py-0 rounded-md shadow-md border border-white/10 w-fit">
            <i className="text-xs md:text-sm text-black font-normal font-sans">
              {location}
            </i>
          </div>

          {/* Bottom overlay (Location) */}
          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-all duration-500 group-hover:from-purple-900/80">
          <p className="text-base font-semibold text-white truncate">
            {location}
          </p>
        </div> */}
        </div>

        {/* Event Info Section */}
        <div className="p-3 space-y-2 text-left">
          <h2 className="text-2xl font-sans font-bold text-black group-hover:text-purple-700 transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
         
          {hasEventPassed ? (
            <div
              style={{
                background: "#fee2e2",
                padding: "10px 16px",
                borderRadius: "8px",
                color: "#b91c1c",
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                boxShadow: "0 3px 8px rgba(185,28,28,0.15)",
              }}
            >
              Event Closed
            </div>
          ) : (
            <p className="text-sm text-gray-500 group-hover:text-indigo-600">
              {formattedDate}
            </p>
          )}
          {/* <button className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium shadow hover:from-indigo-600 hover:to-purple-600 transition-all duration-500">
          View Details
        </button> */}
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
