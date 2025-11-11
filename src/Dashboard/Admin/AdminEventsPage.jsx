import React, { useContext, useEffect, useState } from "react";
import AdminCreatEventHeader from "../../Common/AdminCreatEventHeader";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { href, useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import Modal from "react-modal";

import "../../AdminStyles/AdminEvents.css";

import "../../MediaQuery/AdminEventsPage.css";
Modal.setAppElement("#root");

const AdminEventsPage = () => {
  const {
    getAdminEvents,
    adminEvents,
    getUserBookings,
    userBookingInfo,
    numberOfBookedTicket,
  } = useContext(adminAuthContext);

  const [selectedEvents, setselectedEvents] = useState(null);
  const [modalOpen, setOpen] = useState(false);

  const { eventId } = useParams();

  const { userInfo } = useContext(adminAuthContext);
  const [eventsAvailable, setEventAvailable] = useState([]);

  // useEffect(() => {
  //   getAdminEvents(managerId);
  // }, [managerId]);
  let subtitle;

  const { id } = useParams;
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

  useEffect(() => {
    if (eventsAvailable.length > 0 && !selectedEvents) {
      setselectedEvents(eventsAvailable[0]);
    }
  }, [eventsAvailable, selectedEvents]);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAdminEvents = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/admin/events/manager/${userInfo._id}`
        );
        const data = await response.json();
        if (data.Status === "Success") {
          setEventAvailable(data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userInfo?._id) getAdminEvents();
  }, [userInfo]);
  console.log(eventsAvailable);

  useEffect(() => {
    if (selectedEvents?._id) {
      getUserBookings(selectedEvents?._id);
    }
  }, [selectedEvents]);

  return (
    <div>
      <AdminCreatEventHeader />

      <div>
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
              top: "60%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "16px",
              padding: "1.8rem 1.5rem",
              width: "95%",
              maxWidth: "880px",
              border: "none",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease-in-out",
              overflow: "hidden",
            },
          }}
          contentLabel="User Bookings"
        >
          <div className="border-b border-gray-100 pb-3 mb-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                <span className="text-blue-600">{selectedEvents?.title}</span>
              </h2>
              <a
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer focus:outline-none transition-all duration-200 no-underline"
              >
                &times;
              </a>
            </div>

            {/* Booking Info Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
              <table className="w-full min-w-[800px] text-sm text-left text-gray-600">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-2 py-3">S/N</th>
                    <th className="px-2 py-3">Name</th>{" "}
                    <th className="px-2 py-3">Email</th>
                    <th className="px-2 py-3 text-center">Total Bookings</th>
                    <th className="px-2 py-3 text-center">BookingId</th>
                    <th className="px-2 py-3 text-center">Event Price</th>
                    <th className="px-2 py-3 text-center">Quantity</th>
                    <th className="px-2 py-3 text-center">Amount Paid</th>
                    <th className="px-2 py-3 text-center">Paid At</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {userBookingInfo.length > 0 ? (
                    userBookingInfo.map((user, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-blue-50 transition-all duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-3 py-3 font-medium truncate  text-gray-800  max-w-[150px]">{index+1}</td>
                        <td className="px-3 py-3 font-medium truncate  text-gray-800  max-w-[150px]">
                          {user?.name}
                        </td>
                        <td className="px-3 py-3 text-gray-700  max-w-[180px]">
                          {user?.email}
                        </td>
                        <td className="px-3 py-3  text-center font-bold text-2xl text-gray-900">
                          {user?.totalBookings}
                        </td>
                        <td className="px-3 py-3  text-center  text-sm text-gray-900">
                          {user?.BookingId}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-800">
                          ₦{user?.EventPrice?.toLocaleString()}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-800">
                          {user?.Quantity}
                        </td>
                        <td className="px-3 py-3 text-center font-semibold text-blue-600">
                          ₦{user?.TotalAmountPaid?.toLocaleString()}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-700">
                          {new Date(user?.dateCreated).toLocaleDateString(
                            [],
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-5 text-center text-gray-500 italic bg-gray-50"
                      >
                        No booking information available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Number of Booked Tickets */}
            <div className=" text-right">
              <p className="text-sm md:text-base text-gray-600">
                Total Tickets Booked:{" "}
                <span className="font-semibold text-gray-800">
                  {numberOfBookedTicket}
                </span>
              </p>
            </div>
          </div>
        </Modal>
      </div>

      {/* <button>Go to Dashboard</button> */}

      <div className="flex flex-col md:flex-row">
        <div
          className="
    bg-white shadow-sm border-r border-gray-200
    flex md:flex-col items-center md:items-stretch gap-2
    overflow-x-auto md:overflow-y-auto
    w-full md:w-72 h-auto md:h-screen
    px-2 py-3 md:p-4
    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
  "
        >
          {eventsAvailable.map((eve, index) => (
            <div
              key={index}
              className={`
        flex flex-col items-center md:items-start
        min-w-[160px] md:min-w-0
        bg-white hover:bg-gray-50
        border rounded-xl p-2 md:p-3
        transition-all duration-300 cursor-pointer
        shadow-sm hover:shadow-md
        ${
          selectedEvents?._id === eve._id
            ? "border-blue-500 shadow-md scale-[1.02]"
            : "border-gray-200"
        }
      `}
              onClick={() => setselectedEvents(eve)}
            >
              {/* Event Image */}
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={eve.coverImage}
                  alt={eve.title}
                  className="w-full h-32 md:h-40 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Event Title */}
              <h1
                className="
          text-sm md:text-base font-semibold text-gray-900 
          mt-2 text-center md:text-left  w-full
        "
              >
                {eve.title}
              </h1>

              {/* Event Location */}
              <p className="flex items-center gap-1 text-gray-600 text-xs md:text-sm font-medium mt-1">
                <i className="fa fa-location-arrow text-blue-500 text-xs md:text-sm"></i>
                <span className="">{eve.location || "No location"}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="main-content flex-1 p-4">
          {selectedEvents ? (
            <div>
              {/* <img
                src={selectedEvents.coverImage}
                width={400}
                height={250}
                alt={selectedEvents.title}
                className="mainEveImg"
              /> */}

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-inter text-gray-800 w-full text-center">
                {selectedEvents.title}
              </h1>

              <div className="eventContent">
                <div className="eventTime">
                  <h1 className="text-xl text-gray-900 font-bold">
                    <i className="fa fa-calendar"></i>
                    {new Date(selectedEvents.eventDate).toLocaleDateString([], {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    <span className="text-sm font-normal ">
                      {new Date(
                        `${selectedEvents.eventDate}T${selectedEvents.startTime}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </span>
                  </h1>
                </div>
                <div className="eventLink">
                  <div className="eventsLinks">
                    {/* <div>
                      <p className="text-2xl font-bold font-sans">
                        Events Link
                      </p>
                    </div> */}
                    <div>
                      <a
                        href={`/event/${selectedEvents._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all text-sm md:text-base font-inter"
                      >
                        https://www.AuraSpace.com/event/{selectedEvents.title}
                        -tickets-12023939
                      </a>
                    </div>
                  </div>
                  {/* <div className="copyLInkIcon">
                    <i className="fa fa-copy"></i>
                    Copy Link
                  </div> */}
                </div>
                <div className=" eventStatsContainer  d-flex flex-row  gap-10  bg-red ">
                  <div className="eventStat">
                    <p className="text-xl text-gray-600 font-normal font-inter">
                      Net Sales
                    </p>
                    <p className="text-blue-900 text-xl">
                      {/* {selectedEvents?.price || "$00"} */}

                      {`₦${selectedEvents?.TotalAmount.toLocaleString()}.00` ||
                        "#0.00"}
                    </p>
                  </div>

                  <div className="eventStat">
                    <p className="text-xl text-gray-600 font-normal">
                      Tickets Sold
                    </p>
                    <p className="text-blue-900 text-xl">
                      {selectedEvents?.TicketsSold || 0}/
                      {selectedEvents?.TicketsAvailable || 0}
                    </p>
                  </div>

                  <div className="eventStat">
                    <p className="text-xl text-gray-600 font-normal">
                      No of Attendees
                    </p>
                    <p className="text-blue-900 text-xl">
                      {selectedEvents?.Attendees || 0}
                    </p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                  <h2 className="text-xl font-normal text-gray-800 mb-4 font-sans">
                    Sales by Ticket Type
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                          >
                            Ticket Type
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                          >
                            Sold
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-700">
                            General Admission
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {" "}
                            {selectedEvents?.TicketsSold || 0}/
                            {selectedEvents?.TicketsAvailable || 0}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            #{selectedEvents.price}.00
                          </td>
                        </tr>
                        {/* <tr className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-700">VIP</td>
                          <td className="px-4 py-2 text-gray-700">0/50</td>
                          <td className="px-4 py-2 text-gray-700">$100</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded py-2 my-5 px-7">
                  <h2 className="text-xl py-3 text-gray text-left font-normal font-sans">
                    Recent Orders ({userInfo.OrganizerName})
                  </h2>

                  <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Orders
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Price
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {eventsAvailable.length === 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center py-4 text-gray-500 italic"
                            >
                              No transaction has been made yet
                            </td>
                          </tr>
                        ) : (
                          eventsAvailable.map((order, index) => (
                            <tr key={order?._id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-gray-700">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {order?.title}
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {order?.TicketsSold}
                              </td>
                              <td className="px-4 py-2 text-gray-700 ">
                                {new Date(
                                  order?.updatedAt
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2 text-gray-700 ">
                                ₦{order?.TotalAmount?.toLocaleString()}.00
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    <div
                      className="
   fixed bottom-0 left-0 right-0 
    flex flex-col sm:flex-row 
    justify-start
    gap-2 p-4 
    bg-white-100   shadow-sm 
    w-full sm:max-w-md
  "
                    >
                      <Link
                        to={`/admin/update/${selectedEvents._id}`}
                        className="flex-1"
                      >
                        <button className="w-full bg-blue-300 text-black text-sm px-3 py-2 rounded hover:bg-blue-600">
                          Update Events
                        </button>
                      </Link>

                      {/* <button className="flex-1 bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600">
                        Delete Event
                      </button> */}

                      <button
                        className="flex-1 bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
                        onClick={openModal}
                      >
                        View User Bookings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No event selected yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;
