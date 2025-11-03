import React, { useContext, useEffect } from "react";
import { authContext } from "../../../Context/userContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { motion } from "framer-motion";
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
};

const HeroSection = () => {
  const { displayEvents, showEvents } = useContext(authContext);

  useEffect(() => {
    const displayUserEvnts = async () => {
      try {
        await displayEvents();
      } catch (error) {
        console.log(error);
      }
    };
    displayUserEvnts();
  }, []);

  // if (!showEvents.length) return null;

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between px-4 py-5 space-y-6 md:space-y-0 md:space-x-6 
                bg-gradient-to-t from-slate-300 via-violet-400 to-blue-200 text-white rounded-b-2xl"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex flex-col justify-center px-2 md:px-0"
      >
        <h1
          className="text-xl md:text-4xl font-bold font-sans mb-4 text-black "
          style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)" }}
        >
          Experience <span className="text-pink-950">Moments Like</span> <br />
          Never Before with AuraSpace
        </h1>
        <p className="text-base md:text-lg mb-6 max-w-full md:max-w-lg leading-relaxed text-black font-normal font-sans  ">
          Effortlessly book your next unforgettable live experience with Aura
          Space Tickets. Explore a curated selection of electrifying concerts,
          thrilling sports events, and captivating performances—all at your
          fingertips.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-3 justify-center md:justify-start items-center w-full">
          <a
            href="/admin/signup"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold 
               px-5 py-3 rounded-lg shadow-md transition-all duration-500 bg-[length:200%_200%] 
               hover:bg-right-bottom no-underline w-full md:w-auto text-center"
          >
            Create Events
          </a>

          <a
            href="/events"
            className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold 
               px-5 py-3 rounded-lg shadow-md transition-all duration-500 bg-[length:200%_200%] 
               hover:bg-right-bottom no-underline w-full md:w-auto text-center"
          >
            Discover Events
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 backdrop-brightness-80"
      >
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={6000}
          showDots={false}
          arrows={false}
        >
          {showEvents.map((eve, index) => (
            <a
              href={`/event/${eve._id}`}
              key={index}
              className="w-full p-4 flex flex-col items-center justify-center rounded-lg shadow-lg bg-white/10 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300 no-underline text-white"
            >
              {/* Event Image */}
              <img
                src={eve.coverImage}
                alt={eve.title}
                className="w-full md:w-3/4 h-56 md:h-80 object-cover rounded-lg mb-4"
              />

              {/* Event Info */}

              <div className="flex flex-col items-center justify-start w-full p-2">
                {/* Event Title */}
                <div className="text-left w-full">
                  <h3 className="text-lg md:text-3xl font-bold mb-2 font-sans text-gray-900">
                    {eve.title}
                  </h3>
                </div>

                <div className="w-full h-[2px] bg-white my-2 rounded-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-md ">
                  <div className="flex items-center gap-2">
                    {/* <i className="fa fa-location-arrow text-indigo-400"></i> */}
                    <p className="text-sm md:text-base font-normal  font-inter text-gray-800">
                      <span className="font-semibold font-sans text-indigo-500">
                        Location:
                      </span>
                      {eve.location || "TBA"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    {/* <i className="fa fa-calendar text-indigo-400"></i> */}
                    <p className="text-sm md:text-base font-bold font-inter text-gray-800">
                      <span className="font-semibold text-indigo-500">
                        Date:
                      </span>
                      {new Date(eve?.eventDate).getTime() < Date.now() ? (
                        <div
                          style={{
                            background: "#fee2e2",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            color: "#b91c1c",
                            fontWeight: "600",
                            fontSize: "14px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "fit-content",
                            boxShadow: "0 3px 8px rgba(185,28,28,0.15)",
                          }}
                        >
                          Event Closed
                        </div>
                      ) : (
                        new Date(eve?.eventDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) || "TBA"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <i className="fa fa-calendar text-indigo-400"></i> */}
                    <p className="text-sm md:text-base font-bold font-inter text-gray-800">
                      {new Date(eve?.eventDate).getTime() < Date.now() ? (
                        null
                      ) : (
                        <div>
                          <span className="font-semibold text-indigo-500">
                            Price from:
                          </span>
                          #{eve?.price.toLocaleString() || "0"}
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </Carousel>
      </motion.div>
    </div>
  );
};

export default HeroSection;
