import React, { useContext, useEffect } from "react";
import { authContext } from "../../../Context/userContext";
import AllEventsCard from "../../../Component/AllEventsCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ImageSlider = () => {
  const { displayEvents, showEvents } = useContext(authContext);

  useEffect(() => {
    const displayUserEvents = async () => {
      try {
        await displayEvents();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    displayUserEvents();
  }, []);

  const boxContainer = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 py-10 px-4 sm:px-6 md:px-10">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 text-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 via-purple-500 to-pink-500 font-sans leading-tight"
      >
        Upcoming Events Around You
      </motion.h2>

      <div className="flex items-center justify-end p-1">
        <Link
          to={`/events`}
          className="no-underline text-slate-900 font-normal text-sm font-monospace cursor-pointer"
          style={{ fontFamily: "sans-serif", textShadow: "0px 0px 10px white" }}
        >
          Discover More Events
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-4">
        {showEvents.map((eve) => (
          <motion.div
            key={eve._id}
            variants={boxContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4}}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <AllEventsCard
              title={eve.title}
              eventId={eve._id}
              image={eve.coverImage}
              location={eve.location}
              formattedDate={new Date(eve.eventDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              formmattedTime={eve.startTime}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
