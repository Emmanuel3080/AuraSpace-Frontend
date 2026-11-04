import React from "react";
import { Link } from "react-router-dom";
import {
  XIcon,
  UserIcon,
  TicketIcon,
  SparklesIcon,
  LogOutIcon,
  ShieldCheckIcon,
} from "../Common/Icons";

/**
 * AttendeeProfileModal
 * Displays authenticated attendee profile details, membership status,
 * ticket access, and account actions.
 */
export const AttendeeProfileModal = ({ isOpen, onClose, userInfo, onLogout }) => {
  if (!isOpen) return null;

  const displayName = userInfo?.name?.trim() || "My Account";
  const displayEmail = userInfo?.email || "No email linked";
  const profileImage = userInfo?.profileImage;

  // Fallback avatar initials: "Jane Doe" -> "JD", "Alex" -> "AL", empty -> "MA"
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "MA";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(userInfo?.name);
  const latestBookingId = localStorage.getItem("LatestBookingId");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111827]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl border border-[#E9E9E7] shadow-2xl max-w-md w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gradient Banner */}
        <div className="h-28 bg-gradient-to-r from-[#111827] via-[#8065E8] to-[#F45B69] relative p-4 flex items-start justify-end">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0 cursor-pointer transition-colors"
            aria-label="Close Profile"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pt-0 pb-6 -mt-12 space-y-6">
          {/* Avatar and Identity */}
          <div className="flex items-end justify-between">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8065E8] to-[#5D3FD3] text-white flex items-center justify-center font-extrabold text-2xl ring-4 ring-white shadow-lg font-['Plus_Jakarta_Sans']">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Account" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8065E8]/10 text-[#8065E8] border border-[#8065E8]/20">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Attendee</span>
            </span>
          </div>

          {/* User Details */}
          <div>
            <h3 className="text-xl font-extrabold text-[#111827] tracking-tight font-['Plus_Jakarta_Sans']">
              {displayName}
            </h3>
            <p className="text-xs text-[#737783] mt-0.5">{displayEmail}</p>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783] block">
                Account Status
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783] block">
                Access Level
              </span>
              <span className="text-xs font-bold text-[#111827] block mt-1">
                General Attendee
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-[#E9E9E7]">
            {latestBookingId ? (
              <Link
                to={`/tickets/${latestBookingId}`}
                onClick={onClose}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#F7F6F2] border border-[#E9E9E7] text-sm font-semibold text-[#111827] no-underline transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#8065E8]/10 text-[#8065E8]">
                    <TicketIcon className="w-4 h-4" />
                  </div>
                  <span>View Latest Ticket</span>
                </div>
                <span className="text-xs text-[#8065E8] font-bold">Open &rarr;</span>
              </Link>
            ) : (
              <Link
                to="/events"
                onClick={onClose}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#F7F6F2] border border-[#E9E9E7] text-sm font-semibold text-[#111827] no-underline transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#8065E8]/10 text-[#8065E8]">
                    <TicketIcon className="w-4 h-4" />
                  </div>
                  <span>Explore Live Events</span>
                </div>
                <span className="text-xs text-[#8065E8] font-bold">Browse &rarr;</span>
              </Link>
            )}

            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-sm font-semibold transition-colors cursor-pointer"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Sign Out of AuraSpace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfileModal;
