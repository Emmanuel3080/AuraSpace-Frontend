import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../Common/Icons";

const SingleEventImage = ({ link, alt }) => {
  return (
    <div className="relative pt-20 bg-[#111827]">
      {/* Back button breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors no-underline"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Back to all events</span>
        </Link>
      </div>

      {/* Hero Cover Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#111827]">
          <img
            src={link || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"}
            alt={alt || "Event Cover Banner"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-black/20" />
        </div>
      </div>
    </div>
  );
};

export default SingleEventImage;
