import React from "react";
import { Link } from "react-router-dom";
import AuraspaceLogo from "./AuraspaceLogo";
import { SparklesIcon, TicketIcon, ArrowRightIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-12 border-t border-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/user/dashboard" className="no-underline">
              <AuraspaceLogo variant="light" size="lg" />
            </Link>

            <p className="text-[#737783] text-sm leading-relaxed max-w-sm">
              The premium event marketplace connecting people with remarkable live concerts, tech summits, networking meetups, and creative workshops.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80">
                <SparklesIcon className="w-3.5 h-3.5 text-[#F45B69]" />
                <span>Crafted for creators & attendees</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-[#737783] list-none p-0">
              <li>
                <Link to="/events" className="hover:text-white transition-colors no-underline">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=Music" className="hover:text-white transition-colors no-underline">
                  Concerts & Music
                </Link>
              </li>
              <li>
                <Link to="/events?category=Technology" className="hover:text-white transition-colors no-underline">
                  Tech Conferences
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors no-underline">
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizers */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Organizers
            </h4>
            <ul className="space-y-2 text-sm text-[#737783] list-none p-0">
              <li>
                <Link to="/admin/signup" className="hover:text-white transition-colors no-underline">
                  Host an Event
                </Link>
              </li>
              <li>
                <Link to="/admin/signin" className="hover:text-white transition-colors no-underline">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors no-underline">
                  Payouts & Banking
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay in the loop
            </h4>
            <p className="text-xs text-[#737783] leading-relaxed">
              Get notified of early bird ticket drops and exclusive member-only access.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to AuraSpace!");
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="name@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#737783] text-xs outline-none focus:border-[#8065E8] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#8065E8] hover:bg-[#8065E8]/90 text-white font-semibold text-xs transition-colors flex-shrink-0 border-0 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737783]">
          <p>© {new Date().getFullYear()} AuraSpace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Secure payments via Paystack</span>
            <span>Lagos • Abuja • London</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
