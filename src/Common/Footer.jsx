import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-950 via-indigo-900 to-violet-950 text-gray-200 py-14 px-6 md:px-20 mt-20 relative overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
            Aura<span className="text-indigo-400">Space</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your gateway to unforgettable experiences. Discover, book, and enjoy
            events that spark your passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Events", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300 text-sm no-underline inline-block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h3>
          <div className="text-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              <i className="fa-solid fa-location-dot text-indigo-400"></i>
              <span>Lagos, Nigeria</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-indigo-400"></i>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=emmanuelabiodun041@gmail.com&su=Event%20Inquiry&body=Hello%20Emmanuel,"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-gray-300 hover:text-indigo-400 transition duration-300"
              >
                <i className="z-10">Email Me</i>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-indigo-400"></i>
              <a
                href="https://wa.me/2348131203872"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-gray-300 hover:text-indigo-400 transition duration-300"
              >
                +234 813 120 3872
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center space-x-5">
            {[
              { icon: "fab fa-facebook-f", color: "hover:text-blue-500" },
              { icon: "fab fa-twitter", color: "hover:text-sky-400" },
              { icon: "fab fa-instagram", color: "hover:text-pink-500" },
              { icon: "fab fa-linkedin-in", color: "hover:text-blue-400" },
            ].map((s, i) => (
              <a
                key={i}
                href="#"
                className={`${s.color} text-gray-400 text-xl hover:scale-110 transition-transform duration-300`}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-400">AuraSpace Events</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
