import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../Context/userContext";
import { toast } from "sonner";
import AuraspaceLogo from "./AuraspaceLogo";
import AttendeeProfileModal from "../Component/AttendeeProfileModal";
import {
  MenuIcon,
  XIcon,
  TicketIcon,
  PlusIcon,
  LogOutIcon,
  UserIcon,
  SparklesIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from "./Icons";

// Calculate attendee initials from name
const getAttendeeInitials = (name) => {
  if (!name || typeof name !== "string") return "MA";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Header = () => {
  const { userInfo, handleLogout, authLoading } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  const token = localStorage.getItem("AccessToken");
  const isAuthenticated = Boolean(token);
  const latestBookingId = localStorage.getItem("LatestBookingId");

  // Attendee profile data
  const displayName = userInfo?.name?.trim() || "My Account";
  const displayEmail = userInfo?.email || "";
  const profileImage = userInfo?.profileImage;
  const initials = getAttendeeInitials(userInfo?.name);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdown when changing routes
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Explore Events", path: "/events" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E9E9E7]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/user/dashboard"
            className="no-underline"
            onClick={() => setMenuOpen(false)}
          >
            <AuraspaceLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/user/dashboard"
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors no-underline ${
                location.pathname === "/user/dashboard" || location.pathname === "/"
                  ? "text-[#111827] bg-[#E9E9E7]/60"
                  : "text-[#737783] hover:text-[#111827] hover:bg-[#E9E9E7]/40"
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors no-underline ${
                  location.pathname === link.path
                    ? "text-[#111827] bg-[#E9E9E7]/60"
                    : "text-[#737783] hover:text-[#111827] hover:bg-[#E9E9E7]/40"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Ticket Access */}
            {latestBookingId ? (
              <Link
                to={`/tickets/${latestBookingId}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#8065E8] hover:bg-[#8065E8]/10 transition-colors no-underline"
              >
                <TicketIcon className="w-4 h-4" />
                <span>My Ticket</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  toast.info("No active ticket found. Book an event to see your ticket here!", {
                    duration: 3500,
                  })
                }
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#737783] hover:text-[#111827] hover:bg-[#E9E9E7]/40 transition-colors bg-transparent border-0 cursor-pointer"
              >
                <TicketIcon className="w-4 h-4" />
                <span>My Ticket</span>
              </button>
            )}
          </div>

          {/* Right CTA / Profile Section */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin/signup"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111827] border border-[#E9E9E7] hover:border-[#111827] bg-white px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 no-underline"
            >
              <SparklesIcon className="w-3.5 h-3.5 text-[#F45B69]" />
              <span>Create Event</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative pl-2 border-l border-[#E9E9E7]" ref={dropdownRef}>
                {authLoading && !userInfo ? (
                  // Graceful loading skeleton
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E9E9E7] animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="w-16 h-3 bg-gray-200 rounded" />
                  </div>
                ) : (
                  // Authenticated Attendee Profile Trigger
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white hover:bg-gray-50 border border-[#E9E9E7] hover:border-[#8065E8]/40 shadow-xs transition-all cursor-pointer group"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar or Initials */}
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#8065E8]/20 group-hover:ring-[#8065E8]/50 transition"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8065E8] to-[#5D3FD3] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#8065E8]/20 font-['Plus_Jakarta_Sans']">
                        {initials}
                      </div>
                    )}

                    {/* Attendee Name */}
                    <span className="text-sm font-bold text-[#111827] max-w-[120px] truncate">
                      {displayName}
                    </span>

                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 text-[#737783] transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-[#8065E8]" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Attendee Profile Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#E9E9E7] shadow-xl shadow-[#111827]/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-3 py-3 border-b border-[#E9E9E7]/80">
                      <div className="flex items-center gap-2.5">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={displayName}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#8065E8]/30 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8065E8] to-[#5D3FD3] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#8065E8]/30 shrink-0 font-['Plus_Jakarta_Sans']">
                            {initials}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#111827] truncate font-['Plus_Jakarta_Sans']">
                            {displayName}
                          </p>
                          {displayEmail && (
                            <p className="text-xs text-[#737783] truncate mt-0.5">
                              {displayEmail}
                            </p>
                          )}
                          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#8065E8]/10 text-[#8065E8]">
                            Verified Attendee
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <div className="py-1.5 space-y-0.5">
                      {/* Profile Action */}
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          setProfileModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-[#F7F6F2] hover:text-[#8065E8] rounded-xl transition-colors bg-transparent border-0 cursor-pointer text-left"
                      >
                        <UserIcon className="w-4 h-4 text-[#737783]" />
                        <span>Profile Details</span>
                      </button>

                      {/* My Tickets Action */}
                      {latestBookingId ? (
                        <Link
                          to={`/tickets/${latestBookingId}`}
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-[#F7F6F2] hover:text-[#8065E8] rounded-xl transition-colors no-underline"
                        >
                          <div className="flex items-center gap-2.5">
                            <TicketIcon className="w-4 h-4 text-[#737783]" />
                            <span>My Tickets</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">
                            Active
                          </span>
                        </Link>
                      ) : (
                        <Link
                          to="/events"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-[#F7F6F2] hover:text-[#8065E8] rounded-xl transition-colors no-underline"
                        >
                          <div className="flex items-center gap-2.5">
                            <TicketIcon className="w-4 h-4 text-[#737783]" />
                            <span>My Tickets</span>
                          </div>
                          <span className="text-[10px] text-[#737783]">Browse</span>
                        </Link>
                      )}
                    </div>

                    {/* Logout Action */}
                    <div className="pt-1 border-t border-[#E9E9E7]/80">
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors bg-transparent border-0 cursor-pointer text-left"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E9E9E7]">
                <Link
                  to="/user/signin"
                  className="px-4 py-2 text-sm font-semibold text-[#111827] hover:text-[#8065E8] transition-colors no-underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/user/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#111827] hover:bg-[#8065E8] rounded-full shadow-sm transition-all no-underline"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-[#111827] hover:bg-[#E9E9E7] rounded-xl transition-colors bg-transparent border-0 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#F7F6F2] border-b border-[#E9E9E7] px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Authenticated Attendee Profile in Mobile View */}
            {isAuthenticated && (
              <div className="p-4 rounded-2xl bg-white border border-[#E9E9E7] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={displayName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#8065E8]/30 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8065E8] to-[#5D3FD3] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#8065E8]/30 shrink-0 font-['Plus_Jakarta_Sans']">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#111827] truncate font-['Plus_Jakarta_Sans']">
                      {displayName}
                    </p>
                    <p className="text-xs text-[#737783] truncate">
                      {displayEmail || "Verified Attendee"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-[#8065E8] bg-[#8065E8]/10 rounded-lg border-0 cursor-pointer"
                >
                  View
                </button>
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <Link
                to="/user/dashboard"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-base font-medium text-[#111827] hover:bg-[#E9E9E7] no-underline"
              >
                Home
              </Link>
              <Link
                to="/events"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-base font-medium text-[#111827] hover:bg-[#E9E9E7] no-underline"
              >
                Explore Events
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-base font-medium text-[#111827] hover:bg-[#E9E9E7] no-underline"
              >
                About
              </Link>
              {latestBookingId ? (
                <Link
                  to={`/tickets/${latestBookingId}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-base font-medium text-[#8065E8] hover:bg-[#8065E8]/10 no-underline flex items-center gap-2"
                >
                  <TicketIcon className="w-4 h-4" />
                  <span>My Tickets</span>
                </Link>
              ) : null}
            </div>

            <div className="pt-4 border-t border-[#E9E9E7] flex flex-col gap-3">
              <Link
                to="/admin/signup"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-white border border-[#E9E9E7] text-[#111827] font-semibold text-sm no-underline shadow-sm"
              >
                Organize an Event
              </Link>

              {isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-[#E9E9E7] text-[#111827] font-semibold text-xs cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-200 cursor-pointer"
                  >
                    <LogOutIcon className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/user/signin"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-[#111827] text-[#111827] font-semibold text-sm no-underline"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/user/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-[#111827] text-white font-semibold text-sm no-underline"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Attendee Profile Modal */}
      <AttendeeProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userInfo={userInfo}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
