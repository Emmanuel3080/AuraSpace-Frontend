import React, { useContext, useState, useMemo } from "react";
import LocationMap, { parseLocationDetails } from "./LocationMap";
import OrganizerInfo from "./OrganizerInfo";
import Modal from "react-modal";
import { BookTicket } from "../Dashboard/Users/BookTicket";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/userContext";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XIcon,
  CheckCircleIcon,
} from "../Common/Icons";

Modal.setAppElement("#root");

const EventInformation = ({
  startDate,
  eventTitle,
  eventDescription,
  eventCategory,
  isPublished,
  eventPrice = 0,
  eventStartTime,
  eventEndTime,
  eventLocation,
  organizerContact,
  organizerName,
  organizerPicture,
  event,
  NumberOfTickets,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useContext(authContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Regular");
  const [quantity, setQuantity] = useState(1);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [customerName, setCustomerName] = useState(userInfo?.name || "");
  const [customerEmail, setCustomerEmail] = useState(userInfo?.email || "");

  const basePrice = Number(eventPrice) || 0;

  // Structured location details: Venue Name, Full Address, City, status flags
  const locationDetails = useMemo(
    () => parseLocationDetails(event, eventLocation),
    [event, eventLocation]
  );

  // Multi-tier ticket structure
  const tiers = {
    Regular: {
      name: "Regular Access",
      price: basePrice,
      perks: ["General Admission Entry", "Digital QR Pass", "Access to main arena"],
      badge: "Standard",
    },
    VIP: {
      name: "VIP Pass",
      price: basePrice > 0 ? basePrice * 2 : 5000,
      perks: ["Fast-Track Priority Entry", "VIP Lounge Access", "Complimentary Welcome Drink"],
      badge: "Popular",
    },
    VVIP: {
      name: "VVIP All-Access",
      price: basePrice > 0 ? Math.round(basePrice * 3.5) : 15000,
      perks: ["Backstage Access", "Dedicated Host Service", "VIP Parking & Exclusive Gift Bag"],
      badge: "Exclusive",
    },
  };

  const currentTierData = tiers[selectedTier];
  const unitPrice = currentTierData.price;
  const totalPrice = unitPrice * quantity;

  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBA";

  const formatTime = (time) => {
    if (!time) return "TBA";
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return time;
    }
  };

  const formattedTime = formatTime(eventStartTime);
  const formattedEndTime = formatTime(eventEndTime);

  // Paystack Integration
  const handlePayStackPayment = () => {
    if (totalPrice === 0) {
      // Free ticket flow
      executeBooking();
      return;
    }

    if (!window.PaystackPop) {
      toast.error("Paystack payment gateway is loading, please try again in a moment.");
      return;
    }

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_API,
      email: customerEmail || userInfo?.email || "attendee@auraspace.com",
      amount: totalPrice * 100, // kobo
      currency: "NGN",
      ref: `AS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Event",
            variable_name: "event_title",
            value: eventTitle,
          },
          {
            display_name: "Tier",
            variable_name: "tier",
            value: selectedTier,
          },
          {
            display_name: "Quantity",
            variable_name: "quantity",
            value: quantity,
          },
        ],
      },
      onSuccess: async () => {
        toast.success("Payment confirmed! Generating your digital ticket...");
        await executeBooking();
      },
      onCancel: () => {
        toast.info("Payment session cancelled.");
      },
    });
  };

  const executeBooking = async () => {
    setBookingInProgress(true);
    try {
      const data = await BookTicket(event._id, quantity);
      if (data?.success || data?.Status === "Success") {
        toast.success("Ticket confirmed! Check your email for booking details.");
        setModalOpen(false);

        const bookingId =
          data?.bookEvent?._id ||
          data?.booking?._id ||
          data?.data?._id ||
          data?._id;

        if (bookingId) {
          localStorage.setItem("LatestBookingId", bookingId);
          navigate(`/tickets/${bookingId}`);
        } else {
          navigate("/events");
        }
      } else {
        toast.error(data?.Message || "Booking registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete ticket booking.");
    } finally {
      setBookingInProgress(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 2-Column Responsive Layout: Left Details, Right Sticky Ticket Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (Content & Schedule) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8065E8]/10 text-[#8065E8]">
                {eventCategory || "General Event"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Verified Listing
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
              {eventTitle || "Untitled Event"}
            </h1>
          </div>

          {/* Quick Date, Time, Venue Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-white border border-[#E9E9E7] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8065E8]/10 text-[#8065E8] flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#737783]">
                  Date & Time
                </p>
                <p className="text-sm font-bold text-[#111827] mt-0.5">
                  {formattedDate}
                </p>
                <p className="text-xs text-[#737783]">
                  {formattedTime} - {formattedEndTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#F45B69]/10 text-[#F45B69] flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#737783]">
                  Venue Location
                </p>
                {locationDetails.isSpecified ? (
                  <>
                    <p className="text-sm font-bold text-[#111827] mt-0.5 truncate">
                      {locationDetails.venue}
                    </p>
                    <p className="text-xs text-[#737783] truncate">
                      {locationDetails.address}
                      {locationDetails.city ? ` • ${locationDetails.city}` : ""}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-[#111827] mt-0.5">
                      Location not specified
                    </p>
                    <p className="text-xs text-[#737783]">Venue TBA</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* About Event Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E9E7] shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#111827]">About This Experience</h2>
            <div className="text-sm sm:text-base text-[#737783] leading-relaxed whitespace-pre-line">
              {eventDescription || "No detailed description provided by the organizer yet."}
            </div>
          </div>

          {/* Map Location Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E9E7] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#8065E8]/10 text-[#8065E8] flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-[#111827]">Event Location</h2>
              </div>
              {locationDetails.isSpecified && !locationDetails.isVirtual && (
                <span className="text-xs font-semibold text-[#8065E8] flex items-center gap-1">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>OpenStreetMap Verified</span>
                </span>
              )}
            </div>

            <LocationMap location={eventLocation} event={event} />
          </div>

          {/* Host / Organizer Card */}
          <OrganizerInfo
            organizerName={organizerName}
            organizerContact={organizerContact}
            organizerPicture={organizerPicture}
            eventName={eventTitle}
            eventDate={formattedDate}
          />
        </div>

        {/* Right Column: Sticky Ticket Selection Card (DICE / Luma inspired) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E9E7] shadow-xl shadow-[#111827]/5 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E9E7]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#737783]">
                  Admission
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-0.5">
                  {totalPrice > 0 ? `₦${totalPrice.toLocaleString()}` : "Free Admission"}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#8065E8]/10 text-[#8065E8]">
                  Available Now
                </span>
              </div>
            </div>

            {/* Ticket Tier Selector Buttons */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#737783]">
                Select Ticket Tier
              </label>

              {Object.entries(tiers).map(([tierKey, data]) => {
                const isSelected = selectedTier === tierKey;
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#111827] bg-[#F7F6F2] shadow-sm ring-1 ring-[#111827]"
                        : "border-[#E9E9E7] bg-white hover:border-[#8065E8]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#111827]">
                          {data.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white border border-[#E9E9E7] text-[#737783]">
                          {data.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#737783] mt-0.5">
                        {data.perks[0]}
                      </p>
                    </div>

                    <span className="font-extrabold text-sm text-[#111827]">
                      {data.price > 0 ? `₦${data.price.toLocaleString()}` : "Free"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#737783]">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-[#E9E9E7] font-bold text-base hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <span className="font-extrabold text-sm text-[#111827] w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-[#E9E9E7] font-bold text-base hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Summary Row */}
            <div className="space-y-1 text-xs text-[#737783] pt-2 border-t border-[#E9E9E7]">
              <div className="flex justify-between">
                <span>{selectedTier} × {quantity}</span>
                <span className="font-semibold text-[#111827]">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Booking Fee</span>
                <span>Included</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-[#111827] hover:bg-[#8065E8] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <TicketIcon className="w-4 h-4" />
              <span>Get {quantity} {quantity > 1 ? "Tickets" : "Ticket"}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#737783]">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>Guaranteed authentic ticket via Paystack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#E9E9E7] shadow-2xl z-40 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#737783]">{selectedTier} Ticket</p>
          <p className="text-lg font-extrabold text-[#111827]">
            {totalPrice > 0 ? `₦${totalPrice.toLocaleString()}` : "Free"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-full bg-[#111827] text-white font-bold text-xs uppercase tracking-wider shadow-md border-0 cursor-pointer"
        >
          Get Ticket
        </button>
      </div>

      {/* Checkout Modal (Simple, elegant Linear/Luma flow) */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            zIndex: 1000,
            backdropFilter: "blur(6px)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "28px",
            padding: "0",
            width: "95%",
            maxWidth: "520px",
            border: "1px solid #E9E9E7",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
          },
        }}
        contentLabel="Ticket Checkout"
      >
        <div className="p-6 sm:p-8 space-y-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E9E9E7]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                Checkout
              </span>
              <h2 className="text-xl font-extrabold text-[#111827] mt-0.5">
                Complete Your Order
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-[#737783] bg-transparent border-0 cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Order Snapshot */}
          <div className="p-4 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7] space-y-2">
            <h4 className="font-bold text-sm text-[#111827] line-clamp-1">
              {eventTitle}
            </h4>
            <div className="flex justify-between text-xs text-[#737783]">
              <span>Tier: <strong>{selectedTier}</strong></span>
              <span>Quantity: <strong>{quantity}</strong></span>
            </div>
            <div className="pt-2 border-t border-[#E9E9E7] flex justify-between font-bold text-sm text-[#111827]">
              <span>Total Amount:</span>
              <span className="text-[#8065E8]">
                {totalPrice > 0 ? `₦${totalPrice.toLocaleString()}` : "Free"}
              </span>
            </div>
          </div>

          {/* Attendee Details Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111827]">
                Attendee Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111827]">
                Ticket Delivery Email
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
              />
              <p className="text-[11px] text-[#737783]">
                Your digital ticket stub and receipt will be delivered here.
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Secure 256-bit encrypted transaction via Paystack</span>
          </div>

          {/* Payment CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full sm:w-1/3 py-3 rounded-xl border border-[#E9E9E7] text-sm font-semibold text-[#737783] hover:text-[#111827] hover:bg-gray-50 bg-transparent cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={bookingInProgress}
              onClick={handlePayStackPayment}
              className="w-full sm:w-2/3 py-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all border-0 cursor-pointer flex items-center justify-center gap-2"
            >
              {bookingInProgress ? (
                <span>Confirming Booking...</span>
              ) : (
                <span>Pay {totalPrice > 0 ? `₦${totalPrice.toLocaleString()}` : "Now"}</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventInformation;
