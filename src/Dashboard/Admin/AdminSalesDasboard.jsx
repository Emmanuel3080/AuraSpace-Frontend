import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAuthContext } from "../../Context/adminAuthContext";
import AdminLayout from "./AdminLayout";
import {
  DollarSignIcon,
  TicketIcon,
  CalendarIcon,
  UsersIcon,
  PlusIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  MapPinIcon,
} from "../../Common/Icons";

const AdminSalesDashboard = () => {
  const { userInfo } = useContext(adminAuthContext);
  const [eventsAvailable, setEventAvailable] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

  useEffect(() => {
    const getAdminEvents = async () => {
      setLoadingEvents(true);
      try {
        const response = await fetch(
          `${baseUrl}/admin/events/manager/${userInfo?._id}`
        );
        const data = await response.json();
        if (data.Status === "Success") {
          setEventAvailable(data.events || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingEvents(false);
      }
    };

    if (userInfo?._id) getAdminEvents();
  }, [userInfo]);

  // Aggregate stats
  const totalRevenue = userInfo?.totalSales || 0;
  const totalEvents = eventsAvailable.length;
  const totalTicketsAvailable = eventsAvailable.reduce(
    (acc, cur) => acc + (Number(cur.TicketsAvailable) || 0),
    0
  );
  const totalAttendees = eventsAvailable.reduce(
    (acc, cur) => acc + (Number(cur.Attendees) || 0),
    0
  );

  return (
    <AdminLayout title="Overview & Analytics">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E9E7]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Welcome back, {userInfo?.OrganizerName || "Organizer"}
            </h2>
            <p className="text-sm text-[#737783] mt-1">
              Here's the real-time performance summary of your event portfolio.
            </p>
          </div>

          <Link
            to="/create/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all no-underline"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* 4 Linear-style KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#737783]">
              <span>Total Revenue</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <DollarSignIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              ₦{Number(totalRevenue).toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>Real-time Paystack settlements</span>
            </div>
          </div>

          {/* Active Events */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#737783]">
              <span>Active Events</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <CalendarIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              {totalEvents}
            </p>
            <p className="text-[11px] text-[#737783]">
              {totalEvents === 1 ? "1 Event Published" : `${totalEvents} Events Published`}
            </p>
          </div>

          {/* Tickets Capacity */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#737783]">
              <span>Total Capacity</span>
              <div className="p-1.5 rounded-lg bg-purple-50 text-[#8065E8]">
                <TicketIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              {totalTicketsAvailable.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#737783]">Tickets issued across all venues</p>
          </div>

          {/* Attendees */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#737783]">
              <span>Confirmed Bookings</span>
              <div className="p-1.5 rounded-lg bg-rose-50 text-[#F45B69]">
                <UsersIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              {totalAttendees.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#737783]">Active checked-in attendees</p>
          </div>
        </div>

        {/* Portfolio Events Management Table */}
        <div className="bg-white rounded-3xl border border-[#E9E9E7] shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E9E7]">
            <div>
              <h3 className="text-xl font-bold text-[#111827]">My Hosted Events</h3>
              <p className="text-xs text-[#737783]">
                Monitor ticket performance, view attendee rosters, or update event details.
              </p>
            </div>
          </div>

          {loadingEvents ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-[#8065E8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-medium text-[#737783]">
                Fetching your hosted events...
              </p>
            </div>
          ) : eventsAvailable.length === 0 ? (
            <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#737783]">
                <CalendarIcon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#111827]">No events hosted yet</h4>
              <p className="text-xs text-[#737783] leading-relaxed">
                Launch your first event, configure custom ticket tiers, and start selling tickets in minutes.
              </p>
              <Link
                to="/create/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8065E8] transition-colors no-underline"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create First Event</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsAvailable.map((eve) => (
                <div
                  key={eve._id}
                  className="rounded-2xl border border-[#E9E9E7] overflow-hidden bg-[#F7F6F2]/50 hover:border-[#111827] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 w-full bg-[#111827] overflow-hidden">
                    <img
                      src={eve.coverImage}
                      alt={eve.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#111827] shadow-sm">
                        {eve.category || "General"}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#111827]/80 text-white backdrop-blur-sm">
                        ₦{Number(eve.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-[#111827] line-clamp-1">
                        {eve.title}
                      </h4>
                      <p className="text-xs text-[#737783] flex items-center gap-1.5 mt-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{eve.eventDate || "Date TBA"}</span>
                      </p>
                      <p className="text-xs text-[#737783] flex items-center gap-1.5 mt-1 truncate">
                        <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{eve.location || "Venue TBA"}</span>
                      </p>
                    </div>

                    {/* Actions Strip */}
                    <div className="pt-3 border-t border-[#E9E9E7] flex items-center justify-between gap-2">
                      <Link
                        to={`/overview/event/${eve._id}`}
                        className="flex-1 text-center py-2 px-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-semibold transition-colors no-underline"
                      >
                        Attendees ({eve.Attendees || 0})
                      </Link>

                      <Link
                        to={`/admin/update/${eve._id}`}
                        className="py-2 px-3 rounded-xl bg-white border border-[#E9E9E7] hover:border-[#111827] text-xs font-semibold text-[#111827] transition-colors no-underline"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/event/${eve._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-[#737783] hover:text-[#111827] bg-transparent no-underline"
                        title="Preview Public Page"
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSalesDashboard;
