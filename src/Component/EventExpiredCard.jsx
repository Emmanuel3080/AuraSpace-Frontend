import React from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
const EventExpiredCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      {/* Icon with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        className="mb-6 bg-red-100 p-6 rounded-full"
      >
        {/* <ClockAlert className="w-16 h-16 text-red-600" /> */}
        <i className="fa-fa clock"></i>
      </motion.div>

      {/* Text content */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-red-600"
      >
        Event Expired
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-3 text-gray-500 text-lg"
      >
        Oops! It looks like this event has already ended. Check out our latest
        events instead.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition no-underline"
        >
          Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EventExpiredCard;
