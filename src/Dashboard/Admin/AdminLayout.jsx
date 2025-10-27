import React, { useContext, useEffect, useState } from "react";
import { adminAuthContext } from "../../Context/adminAuthContext";

const AdminLayout = ({ navlink }) => {
  const { userInfo, adminLogout } = useContext(adminAuthContext);
  const [eventsAvailable, setEventAvailable] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAdminEvents = async () => {
      setLoadingEvents(true);
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
      } finally {
        setLoadingEvents(false);
      }
    };

    if (userInfo?._id) getAdminEvents();
  }, [userInfo]);

  // console.log(eventsAvailable);
  return (
    <div>
      <header className="flex md:hidden items-center justify-between bg-white px-4 py-3 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">
          Aura<span className="text-indigo-600">Space</span>
        </h1>
        <a
          href="#"
          className="text-gray-700 no-underline focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </a>
      </header>
      <aside
        className={`fixed top-10   left-0 h-full bg-white shadow-sm border-r border-gray-100 p-4 flex flex-col justify-between w-52
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:w-64 md:block z-20`}
      >
        <div>
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-lg font-semibold text-gray-800 md:block hidden">
              Aura<span className="text-indigo-600">Space</span>
            </h1>
          </div>

          <nav className="flex flex-col gap-1">
            {/* <a href="" className="text-center font-bold text-slate-900 no-underline text-5xl">Overview</a> */}
            <a
              href="#"
              className="flex items-center gap-3 p-3  text-black font-bold rounded-lg no-underline  hover:bg-gray-100 transition"
            >
              {navlink}
            </a>

            <a
              href="/admin/dashboard"
              className="flex items-center text-black font-bold gap-3 p-3 rounded-lg no-underline hover:bg-gray-100 transition"
            >
              Create Event
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3  text-black font-bold rounded-lg no-underline  hover:bg-gray-100 transition"
            >
              Settings
            </a>
            <a
              href="/account"
              className="flex items-center gap-3 p-3  text-black font-bold rounded-lg no-underline  hover:bg-gray-100 transition"
            >
              Account
            </a>
            <a
              href="#"
              onClick={adminLogout}
              className="flex items-center gap-3 p-3  text-black font-bold rounded-lg no-underline  hover:bg-gray-100 transition"
            >
              Logout
              <i className="fa fa-sign-out-alt"></i>
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default AdminLayout;
