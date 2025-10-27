import React, { useContext, useEffect, useState } from "react";
import AdminCreatEventHeader from "../../Common/AdminCreatEventHeader";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { href, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import "../../AdminStyles/AdminEvents.css";

import "../../MediaQuery/AdminEventsPage.css";

const orders = [
  {
    id: 1,
    name: "Asake Concert",
    quantity: 2,
    date: "2025-10-02",
    price: "$0",
  },
  {
    id: 2,
    name: "World Cup Final",
    quantity: 1,
    date: "2025-10-02",
    price: "$100",
  },
];

const AdminEventsPage = () => {
  const { getAdminEvents, adminEvents } = useContext(adminAuthContext);

  const [selectedEvents, setselectedEvents] = useState(null);

  const { eventId } = useParams();

  const { userInfo } = useContext(adminAuthContext);
  const [eventsAvailable, setEventAvailable] = useState([]);

  // useEffect(() => {
  //   getAdminEvents(managerId);
  // }, [managerId]);

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

  return (
    <div>
      <AdminCreatEventHeader />

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
          mt-2 text-center md:text-left truncate w-full
        "
              >
                {eve.title}
              </h1>

              {/* Event Location */}
              <p className="flex items-center gap-1 text-gray-600 text-xs md:text-sm font-medium mt-1">
                <i className="fa fa-location-arrow text-blue-500 text-xs md:text-sm"></i>
                <span className="truncate">
                  {eve.location || "No location"}
                </span>
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

                      <button className="flex-1 bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600">
                        Delete Event
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
