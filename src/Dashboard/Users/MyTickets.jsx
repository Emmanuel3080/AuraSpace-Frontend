import React, { useEffect, useState, useContext, useRef } from "react";
import { authContext } from "../../Context/userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { generateTicketPDF } from "../../utils/ticketPdfGenerator";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  DownloadIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "../../Common/Icons";

const MyTickets = () => {
  const { getSingleBooking, singleBoooking, showEvents, userInfo } = useContext(authContext);
  const { bookingId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const autoDownloadedRef = useRef(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        await getSingleBooking(bookingId);
      } catch (err) {
        console.error("fetchBooking error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  let savedUser = null;
  try {
    savedUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    // fallback
  }

  // Robust fallbacks for event and user attributes
  const event =
    typeof singleBoooking?.eventId === "object" && singleBoooking?.eventId !== null
      ? singleBoooking.eventId
      : showEvents?.find((e) => e._id === singleBoooking?.eventId) || {};

  const user =
    typeof singleBoooking?.userId === "object" && singleBoooking?.userId !== null
      ? singleBoooking.userId
      : userInfo || savedUser || {};

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date TBA";

  const formatTime = (time) => {
    if (!time) return "TBA";
    try {
      if (time.includes(":")) {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      const d = new Date(time);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    } catch {
      // fallback
    }
    return time;
  };

  const startTime = formatTime(event?.startTime);
  const endTime = formatTime(event?.endTime);

  // Generate .ics calendar file
  const addToCalendar = () => {
    try {
      const title = event?.title || "AuraSpace Event";
      const desc = event?.description || "Booked through AuraSpace";
      const loc = event?.location || "Location not specified";
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${title}`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${loc}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Event added to calendar!");
    } catch {
      toast.error("Could not generate calendar invite.");
    }
  };

  // Download high-resolution vector PDF ticket
  const downloadPDF = async () => {
    setDownloading(true);
    toast.info("Generating high-resolution PDF pass...");

    try {
      await generateTicketPDF({
        booking: singleBoooking?._id ? singleBoooking : { _id: bookingId },
        event,
        user,
      });
      toast.success("Ticket downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("Failed to generate PDF ticket. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Auto-download ticket on initial purchase redirect if requested
  useEffect(() => {
    if (
      location.state?.autoDownload &&
      !loading &&
      (singleBoooking?._id || bookingId) &&
      !autoDownloadedRef.current
    ) {
      autoDownloadedRef.current = true;
      const timer = setTimeout(() => {
        downloadPDF();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [location.state, loading, singleBoooking, bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-10 h-10 border-4 border-[#8065E8] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-[#737783]">
            Retrieving ticket credentials...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!singleBoooking?._id) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border border-[#E9E9E7] shadow-xl text-center max-w-md w-full space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#737783]">
              <TicketIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">
              Ticket Not Found
            </h2>
            <p className="text-sm text-[#737783] leading-relaxed">
              We couldn't retrieve the ticket for this booking reference.
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#8065E8] transition-colors no-underline"
            >
              <span>Explore Events</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <CheckCircleIcon className="w-3.5 h-3.5" />
            <span>Booking Confirmed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            You're all set!
          </h1>
          <p className="text-sm sm:text-base text-[#737783]">
            Present this digital QR pass at the entrance or download your PDF stub below.
          </p>
        </div>

        {/* Digital Ticket Pass (Luma / DICE inspired perforated card) */}
        <div
          id="ticket-stub"
          className="bg-[#111827] text-white rounded-3xl shadow-2xl overflow-hidden border border-white/10"
        >
          {/* Top Pass Hero */}
          <div className="p-6 sm:p-8 space-y-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-white">
                  Aura<span className="text-[#8065E8]">Space</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-white/80">
                  Digital Pass
                </span>
              </div>
              <span className="text-xs font-mono text-[#F45B69] uppercase font-bold">
                REF: {singleBoooking?._id?.slice(-8) || "VERIFIED"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {event?.title || "Special Event Pass"}
            </h2>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs text-white/80">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#737783] block">
                  Date & Time
                </span>
                <span className="font-semibold text-white">
                  {formattedDate} • {startTime}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#737783] block">
                  Location
                </span>
                <span className="font-semibold text-white truncate block">
                  {event?.location || "Location not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Perforated Tear-off Divider */}
          <div className="relative flex items-center justify-between">
            <div className="w-6 h-6 rounded-full bg-[#F7F6F2] -ml-3" />
            <div className="w-full border-b-2 border-dashed border-white/20 mx-2" />
            <div className="w-6 h-6 rounded-full bg-[#F7F6F2] -mr-3" />
          </div>

          {/* Bottom Pass Stub & QR Code */}
          <div className="p-6 sm:p-8 bg-[#161F30] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#737783] block">
                  Attendee
                </span>
                <span className="font-bold text-base text-white">
                  {user?.name || user?.fullName || singleBoooking?.userName || singleBoooking?.attendeeName || "Attendee Guest"}
                </span>
                <span className="text-xs text-[#737783] block">
                  {user?.email || singleBoooking?.userEmail || ""}
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#737783] block">
                    Quantity
                  </span>
                  <span className="font-bold text-white">
                    {singleBoooking?.quantity || 1} {(singleBoooking?.quantity || 1) === 1 ? "Pass" : "Passes"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#737783] block">
                    Paid
                  </span>
                  <span className="font-bold text-[#8065E8]">
                    ₦{Number(singleBoooking?.totalPrice ?? singleBoooking?.amount ?? singleBoooking?.price ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl shadow-lg text-center flex-shrink-0">
              <QRCodeCanvas
                value={singleBoooking?._id || "auraspace-checkin"}
                size={110}
                level="H"
              />
              <span className="text-[9px] font-mono text-gray-700 font-bold block mt-1 tracking-wider">
                SCAN FOR ENTRY
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            disabled={downloading}
            onClick={downloadPDF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111827] text-white font-bold text-sm hover:bg-[#8065E8] shadow-md hover:shadow-xl transition-all border-0 cursor-pointer"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>{downloading ? "Preparing PDF..." : "Download PDF Pass"}</span>
          </button>

          <button
            type="button"
            onClick={addToCalendar}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#111827] border border-[#E9E9E7] font-bold text-sm hover:border-[#111827] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyTickets;
