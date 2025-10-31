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
       <div className="absolute bottom-0 left-0 bg-white/15  
         backdrop-blur-sm px-1 py-0 rounded-md shadow-md border border-white/10 w-fit">
  <span className="text-sm text-black font-sans font-normal tracking-wide">
    {location}
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
