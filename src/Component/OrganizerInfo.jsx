import React from "react";

const OrganizerInfo = ({
  organizerName,
  organizerPicture,
  organizerContact,
}) => {
  return (
    <div className="my-10">
      <div className="my-1 mx-1">
        <h1 className="font-semibold text-xl font-sans text-gray-700 ">
          Event Organized by:
        </h1>
      </div>

      <div className="flex flex-row items-center">
        <div className="flex  flex-row gap-1 my-2">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500">
            <img
              src={
                organizerPicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={organizerName || "Organizer"}
              className="w-full h-20 object-cover"
            />
          </div>
          <div className="flex flex-col">
            <i className="text-sxlm font-normal text-gray-800">
              {organizerName || "Unknown Organizer"}
            </i>
            <div className="flex items-center gap-1 text-gray-700">
              <i className="fa fa-phone"></i>
              {organizerContact ? (
                <a
                  href={`https://wa.me/${organizerContact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 no-underline "
                >
                  {organizerContact}
                </a>
              ) : (
                <p className="text-gray-500">No contact info available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerInfo;
