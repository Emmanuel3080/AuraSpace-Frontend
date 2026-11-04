import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import {
  SparklesIcon,
  ShieldCheckIcon,
  UsersIcon,
  TicketIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "../../Common/Icons";

const VALUES = [
  {
    title: "Vibrant Curation",
    desc: "From underground warehouse parties to premiere tech conferences, we spotlight authentic cultural moments.",
    icon: <SparklesIcon className="w-5 h-5 text-[#8065E8]" />,
  },
  {
    title: "Fair & Seamless Ticketing",
    desc: "Transparent pricing in local currencies with instant digital QR passes, calendar sync, and PDF downloads.",
    icon: <TicketIcon className="w-5 h-5 text-[#8065E8]" />,
  },
  {
    title: "Empowered Creators",
    desc: "An organizer dashboard giving real-time revenue analytics, attendee rosters, and instant gate check-ins.",
    icon: <UsersIcon className="w-5 h-5 text-[#8065E8]" />,
  },
  {
    title: "Trust & Safety",
    desc: "Bank-grade Paystack integration ensuring secure payments for attendees and reliable payouts for organizers.",
    icon: <ShieldCheckIcon className="w-5 h-5 text-[#8065E8]" />,
  },
];

const CITIES = [
  "Lagos",
  "Abuja",
  "Ibadan",
  "Port Harcourt",
  "Accra",
  "Nairobi",
  "Kigali",
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#111827] flex flex-col justify-between selection:bg-[#8065E8] selection:text-white">
      <Header />

      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto flex-1 w-full space-y-20">
        {/* Editorial Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8065E8]/10 text-[#8065E8]">
            <SparklesIcon className="w-3.5 h-3.5" />
            Our Vision & Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] font-['Plus_Jakarta_Sans'] leading-tight">
            Connecting people through{" "}
            <span className="text-[#8065E8]">extraordinary</span> live experiences.
          </h1>
          <p className="text-base text-[#737783] leading-relaxed">
            AuraSpace is a premier event discovery and ticketing marketplace built for the modern creator economy. We bridge fans and creators with elegant design, instant ticketing, and powerful organizer tooling.
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] font-['Plus_Jakarta_Sans']">
              Events are more than calendar dates — they are cultural milestones.
            </h2>
            <p className="text-sm text-[#737783] leading-relaxed">
              We started AuraSpace with a simple conviction: booking an event should feel as exhilarating as being in the crowd. Generic ticketing sites are cluttered, slow, and transactional. AuraSpace brings the clean elegance of modern design tools together with the community energy of unforgettable festivals.
            </p>
            <p className="text-sm text-[#737783] leading-relaxed">
              Whether you are an attendee looking for your next weekend soundtrack or an organizer launching an international summit, AuraSpace gives you the stage.
            </p>
          </div>

          <div className="bg-[#111827] text-white rounded-2xl p-8 space-y-6 shadow-sm border border-[#111827]">
            <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-[#F45B69]" />
              The AuraSpace Promise
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              "We believe Africa’s creative energy is unmatched. Our mission is to build the continent’s most trusted, beautifully designed event hub — uniting music, technology, art, and community."
            </p>
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <span>Founded in Nigeria</span>
              <span className="text-[#8065E8] font-semibold">Scaling Pan-Africa</span>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
              What Drives Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mt-1 font-['Plus_Jakarta_Sans']">
              Built on four core pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E9E9E7] rounded-xl p-6 shadow-xs hover:border-[#8065E8] transition duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8065E8]/10 flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2 font-['Plus_Jakarta_Sans']">
                  {val.title}
                </h3>
                <p className="text-xs text-[#737783] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Communities */}
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-8 md:p-10 text-center space-y-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#737783]">
            Our Footprint
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] font-['Plus_Jakarta_Sans']">
            Serving creators and fans across leading hubs
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
            {CITIES.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#F7F6F2] border border-[#E9E9E7] text-[#111827]"
              >
                <MapPinIcon className="w-3.5 h-3.5 text-[#8065E8]" />
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-[#111827] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans']">
              Ready to experience AuraSpace?
            </h3>
            <p className="text-xs text-gray-400">
              Browse upcoming live experiences or launch your next event in minutes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="px-5 py-2.5 bg-white text-[#111827] font-semibold text-xs rounded-xl hover:bg-gray-100 transition no-underline"
            >
              Explore Events
            </Link>
            <Link
              to="/create/events"
              className="px-5 py-2.5 bg-[#8065E8] text-white font-semibold text-xs rounded-xl hover:bg-[#6f54d6] transition flex items-center gap-1.5 no-underline"
            >
              <span>Host an Event</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
