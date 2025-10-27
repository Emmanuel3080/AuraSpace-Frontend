import React, { useContext, useEffect, useState } from "react";
import { adminAuthContext } from "../../Context/adminAuthContext";
import AdminLayout from "./AdminLayout";

const AdminSalesDashboard = () => {
  const { userInfo } = useContext(adminAuthContext);
  const [eventsAvailable, setEventAvailable] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAdminEvents = async () => {
      setLoadingEvents(true);
      try {
        const response = await fetch(
          `${baseUrl}/admin/events/manager/${userInfo?._id}`
        );
        const data = await response.json();
        if (data.Status === "Success") {
          setEventAvailable(data.events);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingEvents(false);
      }
    };

    if (userInfo?._id) getAdminEvents();
  }, [userInfo]);
  // console.log(userInfo);

  // console.log(eventsAvailable);

  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
        {/* Mobile Header */}

        {/* Sidebar */}
        <AdminLayout
          navlink={
            <a href="/dashboard" className="no-underline  text-black">
              Dashboard
            </a>
          }
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            Hello {userInfo?.OrganizerName || "Organizer"} 👋
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-indigo-50 p-4 sm:p-6 rounded-2xl shadow-sm border border-indigo-100">
              <p className="text-gray-600 text-sm sm:text-base">
                Account Balance(Total Sales)
              </p>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  ₦{userInfo?.totalSales?.toLocaleString() || "0"}
                </h2>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 sm:p-6 rounded-2xl shadow-sm border border-indigo-100">
              <p className="text-gray-600 text-sm sm:text-base">Total Events</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                {eventsAvailable.length}
              </h2>
            </div>
          </div>

          {/* Events Section */}
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                My Events
              </h2>
            </div>

            {loadingEvents ? (
              <p className="text-center text-gray-500 py-4">
                Fetching Events...
              </p>
            ) : eventsAvailable.length === 0 ? (
              <p className="text-gray-500 text-center py-8 italic">
                No events have been created yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsAvailable.map((eve, index) => (
                  <div key={index} className="flex justify-center">
                    <a
                      href={`/overview/event/${eve._id}`}
                      className="bg-white border border-gray-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 no-underline w-full max-w-sm"
                    >
                      {/* Event Image */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                        <img
                          src={eve.coverImage}
                          alt={eve.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                          {eve.title}
                        </h3>
                        {/* <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {eve.description || "No description provided."}
                        </p> */}

                        <div className="flex justify-between items-center font-medium text-sm text-gray-600 mt-3 flex-wrap">
                          <p className="flex items-center gap-1 ">
                            <i className="fa fa-location-arrow text-slate-500"></i>
                            {eve.location || "TBA"}
                          </p>
                          <p className="flex items-center gap-1">
                            <i className="fa fa-calendar  text-slate-500"></i>
                            {eve.eventDate || "TBA"}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSalesDashboard;
