import React, { useContext } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import logo from "/AuraspaceNoBg.png";
const AdminCreatEventHeader = () => {
  const { userInfo } = useContext(adminAuthContext);

  return (
    <header className="w-full flex items-center justify-between bg-white shadow-md px-3 sm:px-6 py-2 sticky top-0 z-30">
      <div className="flex items-center gap-1">
        <img
          src={logo}
          width={100}
          height={100}
          alt="Logo"
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <h1 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 truncate max-w-[100px] sm:max-w-[140px]">
            {userInfo?.OrganizerName || "Guest"}
          </h1>
        </div>

        {userInfo?.AdminProfileImg ? (
          <img
            src={userInfo.AdminProfileImg}
            alt="Admin"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 border border-gray-300">
            <i className="fa fa-user text-gray-500 text-base sm:text-lg md:text-xl"></i>
          </div>
        )}

        <a
          href="/dashboard"
          className="flex items-center gap-1 text-xs sm:text-sm md:text-base font-semibold text-blue-600 hover:text-blue-800 transition-all duration-200 no-underline"
        >
          <i className="fa fa-arrow-left text-xs sm:text-sm md:text-base"></i>
          <span className="hidden sm:inline">Go to Dashboard</span>
        </a>
      </div>
    </header>
  );
};

export default AdminCreatEventHeader;
