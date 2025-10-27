import React from "react";
import { motion } from "framer-motion";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen text-gray-800">
      <Header />

      <section className="pt-28 pb-20 px-6 md:px-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            About <span className="text-gray-900">Auraspace</span>
          </h1>
          <p className="text-lg text-gray-600">
            We connect people through unforgettable experiences — helping you
            discover and attend the most exciting events across Nigeria and
            Africa.
          </p>
        </motion.div>

        {/* About Sections */}
        <div className="flex flex-col space-y-20">
          {/* Who We Are */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At <strong>Auraspace</strong>, we believe events are more than
                just dates on a calendar — they’re experiences that connect
                communities. From laughter-filled comedy shows to
                innovation-driven tech expos, we’re your one-stop platform for
                discovering and promoting meaningful events that inspire,
                entertain, and empower.
              </p>
            </div>

            <div className="md:w-1/2 bg-gradient-to-l from-indigo-300 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Our Core Values</h3>
              <ul className="space-y-2">
                <li>✨ Creativity and Connection</li>
                <li>🤝 Collaboration and Inclusivity</li>
                <li>🚀 Innovation through Technology</li>
                <li>💬 Authentic Community Engagement</li>
              </ul>
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-center gap-10"
          >
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                To become Africa’s most trusted event discovery hub — where
                creativity, technology, and culture meet to celebrate the
                continent’s vibrant energy.
              </p>

              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                Our Mission
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Make event discovery simple, engaging, and accessible.</li>
                <li>
                  Support organizers with tools to promote and grow events.
                </li>
                <li>
                  Bridge creators, fans, and communities through technology.
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
              <p className="leading-relaxed">
                We’re building more than a platform — we’re building trust.
                Every connection made on Auraspace is a step toward a more
                vibrant, creative Africa where experiences unite people.
              </p>
            </div>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 my-5">
              Our Community
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We proudly serve event lovers and organizers in{" "}
              <strong>Ibadan, Lagos, Abuja, Accra</strong>, and across Africa —
              uniting cultures through art, music, and technology.
            </p>
          </motion.div>

          {/* Contact */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
              Get In Touch
            </h2>
            <p className="text-gray-700 mb-2">
              Have an event to feature or want to partner with us?
            </p>
            <p className="text-gray-800 font-medium">
              📧{" "}
              <a
                href="mailto:hello@auraspace.com"
                className="text-indigo-700 hover:underline"
              >
                hello@auraspace.com
              </a>
            </p>
            <p className="text-gray-800 font-medium">
              🌐{" "}
              <a
                href="https://www.auraspace.events"
                className="text-indigo-700 hover:underline"
              >
                www.auraspace.events
              </a>
            </p>
          </motion.div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
