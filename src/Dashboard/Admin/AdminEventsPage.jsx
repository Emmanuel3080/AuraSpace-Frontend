import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminAuthContext } from "../../Context/adminAuthContext";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";
import {
  SearchIcon,
  DownloadIcon,
  CheckCircleIcon,
  UsersIcon,
  TicketIcon,
  ArrowLeftIcon,
  FilterIcon,
  SparklesIcon,
} from "../../Common/Icons";

const AdminEventsPage = () => {
  const { eventId } = useParams();
  const {
    getUserBookings,
    userBookingInfo,
    numberOfBookedTicket,
    getSingleEvents,
    adminSingleEvent,
  } = useContext(adminAuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [checkInMap, setCheckInMap] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (eventId) {
      getUserBookings(eventId);
      getSingleEvents(eventId);
    }
  }, [eventId]);

  const eventTitle = adminSingleEvent?.title || "Event Roster";

  // Toggle Check-in State
  const toggleCheckIn = (bookingId) => {
    setCheckInMap((prev) => {
      const nextState = !prev[bookingId];
      if (nextState) {
        toast.success(`Attendee verified for entry`);
      } else {
        toast.info(`Attendee check-in status cleared`);
      }
      return { ...prev, [bookingId]: nextState };
    });
  };

  // Filter attendees by search and status
  const attendees = userBookingInfo || [];
  const filteredAttendees = attendees.filter((item) => {
    const nameMatch = item?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = item?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = item?.BookingId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = nameMatch || emailMatch || idMatch;

    const isCheckedIn = Boolean(checkInMap[item?.BookingId]);
    if (statusFilter === "checked_in") return matchesSearch && isCheckedIn;
    if (statusFilter === "pending") return matchesSearch && !isCheckedIn;
    return matchesSearch;
  });

  // Export Attendees to CSV
  const exportToCSV = () => {
    if (attendees.length === 0) {
      toast.info("No attendee data to export");
      return;
    }

    try {
      const headers = ["S/N", "Attendee Name", "Email", "Booking ID", "Tickets", "Amount Paid (NGN)", "Check-In Status"];
      const rows = attendees.map((item, idx) => [
        idx + 1,
        `"${item?.name || "N/A"}"`,
        `"${item?.email || "N/A"}"`,
        `"${item?.BookingId || "N/A"}"`,
        item?.Quantity || 1,
        item?.AmountPaid || 0,
        checkInMap[item?.BookingId] ? "Checked In" : "Pending",
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Attendees-${eventTitle.replace(/\s+/g, "_")}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Attendee list exported to CSV!");
    } catch {
      toast.error("Failed to generate CSV export");
    }
  };

  return (
    <AdminLayout title="Attendee & Roster Management">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E9E7]">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737783] hover:text-[#111827] transition-colors no-underline"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              {eventTitle}
            </h2>
            <p className="text-xs text-[#737783]">
              Manage attendee check-ins, verify tickets, and export ticket rosters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E9E9E7] hover:border-[#111827] text-xs font-bold uppercase tracking-wider text-[#111827] shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4 text-[#8065E8]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783]">
              Total Bookings
            </span>
            <p className="text-2xl font-extrabold text-[#111827]">
              {attendees.length}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783]">
              Tickets Sold
            </span>
            <p className="text-2xl font-extrabold text-[#8065E8]">
              {numberOfBookedTicket || attendees.reduce((acc, c) => acc + (c?.Quantity || 1), 0)}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783]">
              Checked-In at Gate
            </span>
            <p className="text-2xl font-extrabold text-emerald-600">
              {Object.values(checkInMap).filter(Boolean).length}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E9E9E7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F7F6F2] border border-transparent focus-within:border-[#8065E8] transition-colors">
            <SearchIcon className="w-4 h-4 text-[#737783] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="w-full bg-transparent border-0 outline-none text-xs font-medium text-[#111827] placeholder-[#737783]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-[#737783]">Status:</span>
            {["all", "checked_in", "pending"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer border ${
                  statusFilter === st
                    ? "bg-[#111827] text-white border-[#111827]"
                    : "bg-[#F7F6F2] text-[#737783] border-[#E9E9E7] hover:border-[#111827]"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Attendee Roster Table (Linear-inspired clean table) */}
        <div className="bg-white rounded-3xl border border-[#E9E9E7] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111827]">
              <thead className="bg-[#F7F6F2] border-b border-[#E9E9E7] text-[10px] font-bold uppercase tracking-wider text-[#737783]">
                <tr>
                  <th className="px-5 py-3.5">Attendee</th>
                  <th className="px-5 py-3.5">Booking ID</th>
                  <th className="px-5 py-3.5 text-center">Passes</th>
                  <th className="px-5 py-3.5 text-center">Amount (₦)</th>
                  <th className="px-5 py-3.5 text-center">Payment Status</th>
                  <th className="px-5 py-3.5 text-right">Gate Check-in</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E9E9E7]">
                {filteredAttendees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#737783]">
                      No attendees found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAttendees.map((att, idx) => {
                    const isChecked = Boolean(checkInMap[att?.BookingId]);
                    return (
                      <tr key={idx} className="hover:bg-[#F7F6F2]/60 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-sm text-[#111827]">
                            {att?.name || "Guest Attendee"}
                          </p>
                          <p className="text-[11px] text-[#737783]">{att?.email}</p>
                        </td>

                        <td className="px-5 py-4 font-mono text-[11px] text-[#737783]">
                          {att?.BookingId || "N/A"}
                        </td>

                        <td className="px-5 py-4 text-center font-bold">
                          {att?.Quantity || 1}
                        </td>

                        <td className="px-5 py-4 text-center font-semibold text-[#8065E8]">
                          ₦{Number(att?.AmountPaid || 0).toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-100">
                            Paid & Confirmed
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => toggleCheckIn(att?.BookingId)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                              isChecked
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                : "bg-white text-[#111827] border-[#E9E9E7] hover:border-[#111827]"
                            }`}
                          >
                            {isChecked ? "Checked In ✓" : "Verify Entry"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEventsPage;
