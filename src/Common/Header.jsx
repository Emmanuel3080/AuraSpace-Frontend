import React, { useContext, useState } from "react";
import { authContext } from "../Context/userContext";
import logo from "/AuraspaceNoBg.png";
import "../ComponentStyles/Header.css";

const Header = () => {
  const { userInfo, handleLogout } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-slate-200 z-50 shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-3 py-1">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <a href="/user/dashboard">
            <img
              src={logo}
              width={100}
              height={100}
              alt="Logo"
              className="object-cover rounded-2xl"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <ul
          className={`fixed md:static top-0 left-0 h-full  gap-y-2 gap-x-5 md:h-auto w-40 md:w-auto  text-center
  bg-slate-100/100 backdrop-blur-2xl md:bg-transparent flex flex-col md:flex-row 
  items-start md:items-center justify-start md:justify-center
  md:space-x-6 space-y-5 md:space-y-0  md:p-0
  shadow-xl md:shadow-none transform transition-transform  duration-300 ease-in-out
  border-r border-gray-300/30 md:border-none
  ${
    menuOpen ? "translate-x-0  px-3 py-0" : "-translate-x-full md:translate-x-0"
  }`}
        >
          {/* Close Button (mobile only) */}
          <a
            className="md:hidden mb-6 text-black text-xl self-end  no-underline hover:text-gray-600 p-2 transition-all duration-200 no-"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa fa-times"></i>
          </a>

          <li>
            <a
              href="/user/dashboard"
              className={`block hover:text-indigo-700 font-normal font-sans tracking-wide transition-colors duration-200 no-underline ${
                menuOpen
                  ? "text-black text-sm font-sans font-normal text-center"
                  : "text-black text-sm"
              }`}
              // style={{fontFamily:""}}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/events"
              className={`block hover:text-indigo-700 font-normal font-sans tracking-wide transition-colors duration-200 no-underline ${
                menuOpen
                  ? "text-black text-sm font-sans font-normal text-center"
                  : "text-black text-sm"
              }`}
            >
              Events
            </a>
          </li>

          <li>
            <a
              href="/tickets/:bookingId"
              className={`block hover:text-indigo-700 font-normal font-sans tracking-wide transition-colors duration-200 no-underline ${
                menuOpen
                  ? "text-black text-sm font-sans font-normal text-center"
                  : "text-black text-sm"
              }`}
            >
              View Tickets
            </a>
          </li>

          <li>
            <a
              href="/about"
               className={`block hover:text-indigo-700 font-normal font-sans tracking-wide transition-colors duration-200 no-underline ${
                menuOpen
                  ? "text-black text-sm font-sans font-normal text-center"
                  : "text-black text-sm"
              }`}
            >
              About
            </a>
          </li>

          <li>
            <a
              href="/admin/signup"
               className={`block hover:text-indigo-700 font-normal font-sans tracking-wide transition-colors duration-200 no-underline ${
                menuOpen
                  ? "text-black text-sm font-sans font-normal text-center"
                  : "text-black text-sm"
              }`}
            >
              Create Events
            </a>
          </li>
        </ul>

        <div className="flex flex-row items-center gap-2 md:gap-5">
          <a
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-sm text-black no-underline"
          >
            <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </a>

          {userInfo?.profileImage ? (
            <img
              src={userInfo.profileImage}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-400"
              alt="Profile Image"
            />
          ) : (
            <i className="fa fa-user text-black text-lg"></i>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className=" md:flex items-center gap-2 bg-indigo-900 hover:bg-slate-600 text-white px-2 py-1.5 rounded-md text-xs md:text-sm transition-all duration-200"
          >
            Logout
            <i className="fa fa-sign-out-alt"></i>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
