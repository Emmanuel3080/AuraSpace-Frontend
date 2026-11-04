import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, MapPinIcon, TicketIcon } from "../Common/Icons";

const EventCard = ({
  event,
  image,
  title,
  location,
  eventId,
  eventdate,
  price,
  category,
  organizer,
}) => {
  // Support both passed-in individual props and an event object
  const _id = eventId || event?._id;
  const _title = title || event?.title || "Untitled Event";
  const _image = image || event?.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
  const rawLoc = location || event?.location;
  const _location =
    !rawLoc || /^(tba|venue tba|location tba|to be announced|not specified)$/i.test(String(rawLoc).trim())
      ? "Location not specified"
      : String(rawLoc).trim();
  const _date = eventdate || event?.eventDate || event?.startTime;
  const _price = price !== undefined ? price : event?.price;
  const _category = category || event?.category;
  const _organizer = organizer || event?.createdBy?.OrganizerName;

  const eventTime = _date ? new Date(_date).getTime() : 0;
  const hasEventPassed = eventTime > 0 && eventTime < Date.now();

  const formattedDate = _date
    ? new Date(_date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Date TBA";

  return (
    <Link
      to={`/event/${_id}`}
      className="group block bg-white rounded-3xl overflow-hidden border border-[#E9E9E7] shadow-sm hover:shadow-xl hover:border-[#111827]/20 transition-all duration-300 transform hover:-translate-y-1 no-underline flex flex-col h-full"
    >
      {/* Event Imagery */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111827]">
        <img
          src={_image}
          alt={_title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {_category ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#111827] shadow-sm">
              {_category}
            </span>
          ) : <span />}

          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#111827]/80 backdrop-blur-md text-white shadow-sm">
            {_price > 0 ? `₦${Number(_price).toLocaleString()}` : "Free"}
          </span>
        </div>

        {/* Expired Ribbon */}
        {hasEventPassed && (
          <div className="absolute inset-0 bg-[#111827]/80 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-[#F45B69] text-white text-xs font-bold uppercase tracking-wider shadow">
              Event Concluded
            </span>
          </div>
        )}
      </div>

      {/* Event Details Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          {/* Date & Time pill */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8065E8]">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#111827] group-hover:text-[#8065E8] transition-colors line-clamp-2 leading-snug">
            {_title}
          </h3>
        </div>

        {/* Location & Host Footer */}
        <div className="pt-3 border-t border-[#E9E9E7] flex items-center justify-between text-xs text-[#737783]">
          <div className="flex items-center gap-1.5 truncate max-w-[180px]">
            <MapPinIcon className="w-3.5 h-3.5 text-[#8065E8] flex-shrink-0" />
            <span className="truncate">{_location}</span>
          </div>

          {_organizer && (
            <span className="font-medium text-[#111827] truncate max-w-[100px]">
              by {_organizer}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
