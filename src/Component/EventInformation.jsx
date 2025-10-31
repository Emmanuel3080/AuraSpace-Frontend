import { time } from "framer-motion";
import React, { useContext, useState } from "react";
import LocationMaop from "./LocationMaop";
import OrganizerInfo from "./OrganizerInfo";

import Modal from "react-modal";
import ReactDom from "react-dom";
import { BookTicket } from "../Dashboard/Users/BookTicket";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/userContext";

Modal.setAppElement("#root");

const EventInformation = ({
  startDate,
  eventTitle,
  eventDescription,
  eventCategory,
  isPublished,
  eventPrice,
  eventStartTime,
  eventEndTime,
  eventLocation,
  organizerContact,
  organizerName,
  organizerPicture,
  event,
  NumberOfTickets,
}) => {
  const formattedDate = new Date(startDate).toLocaleDateString([], {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formatTime = (time) => {
    if (!time) return "Invalid Time";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [modalOpen, setOpen] = useState(false);
  const [quantityValue, setQuantity] = useState(1);
  const [paymentPrice, setEventPrice] = useState(1);
  const [bookUserTicket, setBookingTicket] = useState(false);

  const { userInfo } = useContext(authContext);

  // console.log(userInfo);

  const handlePayStackPayment = () => {
    if (!window.PaystackPop) {
      toast.error("Paystack script not loaded yet!");
      return;
    }

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_API,
      email: userInfo?.email || "guestauraspace@gmail.com",
      amount: eventPrice * quantityValue * 100,
      currency: "NGN",
      ref: `AS-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: eventTitle,
            variable_name: eventTitle,
            value: eventTitle,
          },
        ],
      },
      onSuccess: async () => {
        toast.success("Payment successful! Booking your ticket...");
        await handleTicket();
      },
      onCancel: () => {
        toast.info("Payment cancelled");
      },
    });
  };

  let subtitle;
  const navigate = useNavigate();

  function openModal() {
    setOpen(true);
    // setLoading(true)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpen(false);
  }

  const formattedTime = formatTime(eventStartTime);
  const formattedEndTime = formatTime(eventEndTime);

  const handleTicket = async () => {
    setBookingTicket(true);
    try {
      const data = await BookTicket(event._id, quantityValue);
      if (data.success) {
        // toast.success();
        // console.log(data.bookEvent);
        toast.success(`
            Kindly check your mail for more Information`);
        // navigate(`/tickets/${data.bookEvent._id}`);
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBookingTicket(false);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-7xl mx-auto ">
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "16px",
            padding: "1.8rem 1.5rem",
            width: "95%",
            maxWidth: "680px",
            border: "none",
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease-in-out",
            overflow: "hidden",
          },
        }}
        contentLabel="Ticket Modal"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-5">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Get Ticket for {eventTitle}
          </h2>
          <a
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 no-underline text-2xl font-bold  cursor-pointer focus:outline-none transition-all duration-200"
          >
            &times;
          </a>
        </div>

        {/* Modal Body */}
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between text-sm md:text-base">
            <p className="text-gray-500">Date:</p>
            <span className="font-medium">{formattedDate}</span>
          </div>

          <div className="flex justify-between text-sm md:text-base">
            <p className="text-gray-500">Time:</p>
            <span className="font-medium">
              {formattedTime} - {formattedEndTime}
            </span>
          </div>

          <div className="flex justify-between text-sm md:text-base">
            <p className="text-gray-500">Tickets Available:</p>
            <span className="font-medium bg-blue">{NumberOfTickets}</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-base md:text-lg font-semibold text-gray-700">
              Price:
            </p>
            <span className="text-xl font-bold text-indigo-600">
              ₦{(eventPrice * quantityValue).toLocaleString()}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-5 flex items-center justify-between border border-gray-200 rounded-lg p-3">
            <p className="font-medium text-gray-700 text-sm md:text-base">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setQuantity((prev) => {
                    const newQty = Math.max(1, prev - 1);
                    setEventPrice(newQty * paymentPrice);
                    return newQty;
                  });
                }}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition active:scale-95"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantityValue}</span>
              <button
                onClick={() => {
                  setQuantity((prev) => {
                    const newQty = prev + 1;
                    setEventPrice(newQty * paymentPrice);
                    return newQty;
                  });
                }}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border text-gray-700 bg-gray-100 hover:bg-gray-200 transition text-sm md:text-base"
          >
            Cancel
          </button>

          <button
            disabled={bookUserTicket}
            onClick={handlePayStackPayment}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all text-sm md:text-base ${
              bookUserTicket
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {bookUserTicket ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader border-2 border-t-2 border-white rounded-full w-4 h-4 animate-spin"></span>
                Processing...
              </div>
            ) : (
              `Proceed to Purchase (${quantityValue})`
            )}
          </button>
        </div>
      </Modal>

      {/* Header: Date + Published Status */}
      <div className="flex flex-wrap items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-base font-medium">{formattedDate}</span>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              isPublished
                ? "bg-green-200 text-green-800"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
        {eventTitle || "Untitled Event"}
      </h1>

      {/* Description + Price */}

      <div className=" my-10 flex flex-col md:flex-col md:justify-between gap-1">
        <i className="font-normal text-2xl font-sans">About This Event</i>
        <p className="text-gray-600 leading-relaxed md:max-w-3xl">
          {eventDescription || "No description available."}
        </p>

        <div className="fixed bottom-5 right-5 flex items-center justify-between border-2 border-gray-200 rounded-xl gap-3 px-4 py-2 w-[220px] bg-white shadow-lg z-50 font-bold">
          {`₦${eventPrice?.toLocaleString()}.00`}
          <button
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={openModal}
          >
            Get Ticket
          </button>
        </div>
      </div>

      <div className="">
        <span className=" px-4 py-2 bg-indigo-100 text-black text-xl font-semibold rounded-xl shadow-md ">
          {eventCategory || "General"}
        </span>
      </div>
      <div className="flex flex-col my-5">
        <h1 className="text-lg font-semibold font-sans text-gray-800 mb-2">
          Date & Time
        </h1>

        <div className="flex items-center gap-3 text-gray-600">
          {/* Date */}
          <p className="text-xl text-gray-500 font-normal ">{formattedDate}</p>


          <div className="flex items-center gap-1 text-xl font-normal  font-sans text-gray-500">
            <p>{formattedTime}</p>
            <p>-</p>
            <p>{formattedEndTime}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-gray-800">Location</h1>

        <div className="flex items-center gap-2 text-gray-700">
          <i className="fa fa-globe text-indigo-400"></i>
          <span className="text-xl text-gray-800  md:text-xl font-normal font-sans">
            {eventLocation}
          </span>
        </div>
      </div>

      {/* <div className="flex items-center my-4 cursor-pointer">
        <span className="text-xl text-gray-800  md:text-xl font-normal font-sans">
          Show Direction
        </span>
        <i className="fa fa-chevron-down"></i>
      </div> */}

      <LocationMaop location={eventLocation} />

      <OrganizerInfo
        organizerName={organizerName}
        organizerContact={organizerContact}
        organizerPicture={organizerPicture}
        eventName={eventTitle}
        eventDate={formattedDate}
      />
    </div>
  );
};

export default EventInformation;
