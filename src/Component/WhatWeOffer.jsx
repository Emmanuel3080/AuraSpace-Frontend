import React, { useState } from "react";

import { motion } from "framer-motion";

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border rounded mb-2 w-full">
    <button
      className="w-full text-left px-4 py-2 bg-white hover:bg-white-100 flex justify-between items-center text-black shadow:bg-gray-100"
      onClick={onClick}
    >
      {title}{" "}
      <span>
        {isOpen ? (
          <i className="fa fa-chevron-up"></i>
        ) : (
          <i className="fa fa-chevron-down"></i>
        )}
      </span>
    </button>
    {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
  </div>
);

const WhatWeOffer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "Secure Payments",
      content:
        "Enjoy fast, reliable, and secure payment options with full encryption and multiple supported methods. At AuraSpace, your transactions are protected with advanced security protocols, ensuring peace of mind while you focus on your events.",
    },
    {
      title: "Event Management",
      content:
        "Manage and organize your events smoothly — from creation to ticketing, guest tracking, and analytics. AuraSpace provides intuitive tools to streamline every step of your event management process, making it effortless to host memorable experiences.",
    },
    {
      title: "Community Connection",
      content:
        "Connect with like-minded individuals, discover trending events, and grow your social and professional network. AuraSpace helps you engage with your community, build relationships, and stay informed about events that matter to you.",
    },
    {
      title: "Easy Event Booking",
      content:
        "Book events effortlessly with our intuitive platform. Secure your spot in seconds and receive instant confirmation. AuraSpace ensures a seamless booking experience so you never miss an event you love.",
    },
    {
      title: "Personalized Recommendations",
      content:
        "Discover events tailored to your interests with AuraSpace’s intelligent recommendation system. Whether you love music, sports, tech, or arts, AuraSpace suggests events you'll enjoy, helping you make the most of your free time.",
    },
    {
      title: "24/7 Customer Support",
      content:
        "Need help? AuraSpace provides 24/7 customer support to assist you with bookings, payments, or general inquiries. Our dedicated team ensures yvour experience is smooth and enjoyable at every step.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 ">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 text-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 via-purple-500 to-pink-500 font-sans leading-tight"
        >
          {" "}
          What We Offer{" "}
        </motion.div>{" "}
        <p className="text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
          {" "}
          Discover our range of services designed to make your experience
          seamless, engaging, and memorable.{" "}
        </p>
      </div>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={
            <div className="font-normal font-sans text-slate-800 ">
              {item.title}
            </div>
          }
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <p className="font-sans text-sm">{item.content}</p>
        </AccordionItem>
      ))}

      {/* <p>Create An Account Now</p> */}
    </div>
  );
};

export default WhatWeOffer;
