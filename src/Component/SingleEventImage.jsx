import React, { useContext, useEffect } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useParams } from "react-router-dom";

const SingleEventImage = ({ link, alt }) => {
  //   console.log(adminSingleEvent);
  return (
   <div className="">
  <div className="flex items-center justify-center my-16 bg-slate-100 shadow-md rounded-2xl overflow-hidden max-w-5xl mx-auto">
    <img
      src={link}
      alt={alt}
      className="object-cover w-100 h-100 md:h-80 p-3"
    />
  </div>
</div>

  );
};

export default SingleEventImage;
