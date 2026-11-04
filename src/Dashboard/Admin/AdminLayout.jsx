import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminAuthContext } from "../../Context/adminAuthContext";
import AuraspaceLogo from "../../Common/AuraspaceLogo";
import {
  BarChart3Icon,
  CalendarIcon,
  PlusIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,       
  XIcon,
  SparklesIcon,
  TicketIcon,
} from "../../Common/Icons";

const AdminLayout = ({ children, title = "Dashboard" }) => {
  const { userInfo, adminLogout } = useContext(adminAuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: <BarChart3Icon className="w-4 h-4" />,
    },
    {
      label: "Create Event",
      path: "/create/events",
      icon: <PlusIcon className="w-4 h-4" />,
    },
    {
      label: "Settings & Payouts",
      path: "/account",
      icon: <SettingsIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#111827]/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Linear-inspired Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-[#E9E9E7] flex flex-col justify-between z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Workspace Branding */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E9E9E7]">
            <Link to="/dashboard" className="no-underline">
              <AuraspaceLogo size="sm" badge="Organizer" />
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#737783] hover:text-[#111827] bg-transparent border-0 cursor-pointer p-1"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Create Button */}
          <Link
            to="/create/events"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all no-underline"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Event</span>
          </Link>

          {/* Nav Item Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783] px-3 pb-2 block">
              Management
            </span>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors no-underline ${
                    active
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#737783] hover:text-[#111827] hover:bg-[#F7F6F2]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Marketplace Shortcut */}
          <div className="pt-4 border-t border-[#E9E9E7] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783] px-3 pb-2 block">
              Marketplace
            </span>
            <Link
              to="/user/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#737783] hover:text-[#111827] hover:bg-[#F7F6F2] transition-colors no-underline"
            >
              <SparklesIcon className="w-4 h-4 text-[#8065E8]" />
              <span>Attendee Portal</span>
            </Link>
          </div>
        </div>

        {/* Organizer Account Bottom Card */}
        <div className="p-4 border-t border-[#E9E9E7] bg-[#F7F6F2]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 max-w-[170px]">
              {userInfo?.AdminProfileImg ? (
                <img
                  src={userInfo.AdminProfileImg}
                  alt={userInfo.OrganizerName}
                  className="w-9 h-9 rounded-full object-cover border border-[#E9E9E7]"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-xs">
                  {userInfo?.OrganizerName?.charAt(0) || "O"}
                </div>
              )}
              <div className="truncate">
                <p className="text-xs font-bold text-[#111827] truncate">
                  {userInfo?.OrganizerName || "Organizer"}
                </p>
                <p className="text-[10px] text-[#737783] truncate">{userInfo?.email}</p>
              </div>
            </div>

            <button
              onClick={adminLogout}
              title="Log out of your organizer account"
              className="p-2 text-[#737783] hover:text-[#F45B69] hover:bg-white rounded-lg transition-colors bg-transparent border-0 cursor-pointer"
            >
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-8 bg-white border-b border-[#E9E9E7] flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-[#111827] hover:bg-[#F7F6F2] rounded-lg bg-transparent border-0 cursor-pointer"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-[#111827] tracking-tight">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-800 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Organizer Live</span>
            </span>

            <Link
              to="/create/events"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-[#111827] hover:bg-[#8065E8] text-white shadow-sm transition-all no-underline"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Publish Event</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Dynamic Child Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
