import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { adminAuthContext } from "../Context/adminAuthContext";
import AuraspaceLogo from "./AuraspaceLogo";
import { ArrowLeftIcon, UserIcon } from "./Icons";

const AdminCreatEventHeader = () => {
  const { userInfo } = useContext(adminAuthContext);

  return (
    <header className="w-full flex items-center justify-between bg-white border-b border-[#E9E9E7] px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-xs">
      <Link to="/dashboard" className="no-underline">
        <AuraspaceLogo size="sm" badge="Organizer" />
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-bold text-[#111827] truncate max-w-[140px]">
            {userInfo?.OrganizerName || "Organizer"}
          </span>
          <span className="text-[10px] text-[#737783]">Organizer Account</span>
        </div>

        {userInfo?.AdminProfileImg ? (
          <img
            src={userInfo.AdminProfileImg}
            alt="Admin"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#E9E9E7]"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F6F2] border border-[#E9E9E7] text-[#737783]">
            <UserIcon className="w-4 h-4" />
          </div>
        )}

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737783] hover:text-[#111827] bg-[#F7F6F2] hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors no-underline"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminCreatEventHeader;
