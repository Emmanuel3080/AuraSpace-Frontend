import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-blue-900 via-indigo-800 to-violet-900 shadow:sm text-gray-100 py-10 px-6 md:px-20 mt-20
"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white ">
            Aura<sub className="text-indigo-500">Space</sub>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your gateway to unforgettable experiences. Discover, book, and enjoy
            events that spark your passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white ">Quick Links</h3>
          <ul className="">
            <li>
              <a
                href="/"
                className="hover:text-indigo-400 transition font-sans text-gray-300 text-sm no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="hover:text-indigo-400 transition font-sans text-gray-300 text-sm no-underline"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-indigo-400 transition font-sans text-gray-300 text-sm no-underline"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-400 transition font-sans text-gray-300 text-sm no-underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white ">Get in Touch</h3>
          <div className=" text-sm flex flex-col gap-2 justify-start">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-indigo-400 "></i>
              <span> Lagos, Nigeria </span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-envelope text-indigo-400 "></i>
              <a
                href="mailto:support@auraspace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-white"
              >
                {" "}
                support@auraspace.com
              </a>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-phone text-indigo-400 "></i>
              <a
                href="https://wa.me/2348131203872"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-white"
              >
                {" "}
                +234 813 120 3872
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center space-x-5">
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AuraSpace Events. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
