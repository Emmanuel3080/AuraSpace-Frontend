import React, { useContext, useEffect, useState } from "react";
import Header from "../../Common/Header";
import { authContext } from "../../Context/userContext";
import EventCard from "../../Component/EventCard";
import { motion } from "framer-motion";

const AllEventsPage = () => {
  const { displayEvents, showEvents } = useContext(authContext);

  const [eventPrice, setEventPrice] = useState("");
  const [querys, setSearchQery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userSearched, hasUserSearched] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    displayEvents();
  }, []);

  //Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (querys.trim() || eventPrice) {
        searchEvents(querys, eventPrice);
      } else {
        setFilteredEvents([]);
        hasUserSearched(false);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [querys, eventPrice]);

  const searchEvents = async (querys, eventPrice) => {
    setIsSearching(true);
    hasUserSearched(true);
    try {
      const queryParams = new URLSearchParams();
      if (eventPrice) queryParams.append("maxPrice", eventPrice);
      if (querys) queryParams.append("querys", querys);

      const response = await fetch(
        `${baseUrl}/user/event/search?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );
      const data = await response.json();

      if (data.Status === "Success") {
        setFilteredEvents(data?.events || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  const eventsToDisplay = filteredEvents.length > 0 ? filteredEvents : showEvents;

  // Motion Variants
  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Explore Events
        </motion.h1>

        <form className="flex flex-col md:flex-row items-center justify-between gap-6 mx-auto max-w-5xl bg-white shadow-md rounded-2xl p-10 border border-gray-100">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Name / Location
            </label>
            <input
              type="text"
              value={querys}
              onChange={(e) => setSearchQery(e.target.value)}
              placeholder="Enter event name or location"
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
            >
              <option value="">Select Price</option>
              <option value="500">Up to #500</option>
              <option value="1000">Up to #1000</option>
              <option value="5000">Up to #5000</option>
              <option value="10000">Up to #10,000</option>
              <option value="20000">Up to #20,000</option>
              <option value="30000">Up to #30,000</option>
              <option value="40000">Up to #40,000</option>
              <option value="50000">Up to #50,000</option>
              <option value="60000">Up to #60,000</option>
              <option value="70000">Up to #70,000</option>
              <option value="80000">Up to #80,000</option>
              <option value="90000">Up to #90,000</option>
              <option value="100000">Up to #100,000</option>
              <option value="950000">Up to #950,000</option>
            </select>
          </div>
        </form>

        {isSearching ? (
          <div className="flex items-center justify-center my-20">
            <i className="font-bold text-2xl">No Events Match this Search</i>
          </div>
        ) : userSearched && filteredEvents.length === 0 ? (
          <div className="flex items-center justify-center my-20">
            <i className="font-bold text-2xl">No Events Match this Search</i>
          </div>
        ) : eventsToDisplay.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No events available yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto max-w-6xl my-10"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {eventsToDisplay.map((eve, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <EventCard
                  image={eve?.coverImage}
                  title={eve?.title}
                  eventdate={eve?.eventDate}
                  location={eve?.location}
                  eventId={eve?._id}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default AllEventsPage;
