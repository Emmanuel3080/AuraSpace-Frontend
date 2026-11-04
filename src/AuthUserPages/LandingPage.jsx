import React from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  ShieldCheck,
  Users,
  Compass,
  Calendar,
  Layers,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col justify-between selection:bg-[#8065E8] selection:text-white font-sans">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8065E8] to-[#F45B69] flex items-center justify-center text-white shadow-md">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl tracking-tight text-[#111827]">
            Aura<span className="text-[#F45B69]">space</span>
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737783] hover:text-[#111827] px-3.5 py-2 rounded-full bg-white border border-[#E9E9E7] shadow-xs hover:border-[#111827] transition no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore Events</span>
        </Link>
      </header>

      {/* Main Role Selection */}
      <main className="max-w-4xl w-full mx-auto px-6 py-10 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8065E8]/10 text-[#8065E8] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Started with AuraSpace</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">
            How would you like to experience AuraSpace?
          </h1>
          <p className="text-sm text-[#737783] mt-3 leading-relaxed">
            Choose your journey. Attend handpicked live experiences or command every stage with a professional organizer suite.
          </p>
        </div>

        {/* Dual Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role 1: Attendee */}
          <div className="bg-white border border-[#E9E9E7] hover:border-[#8065E8] rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#8065E8]/10 text-[#8065E8] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <Ticket className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                For Attendees & Fans
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mt-1.5 mb-2 font-['Plus_Jakarta_Sans']">
                Discover & Attend Events
              </h2>
              <p className="text-xs sm:text-sm text-[#737783] leading-relaxed mb-6">
                Explore handpicked festivals, tech summits, and live concerts. Book instant tickets, receive verified digital QR passes, and export calendar invites.
              </p>

              <div className="space-y-3 pb-6 border-b border-[#E9E9E7]">
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <ShieldCheck className="w-4 h-4 text-[#8065E8] shrink-0" />
                  <span>Secure Paystack-powered checkout</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <Sparkles className="w-4 h-4 text-[#8065E8] shrink-0" />
                  <span>Digital QR ticket passes & PDF download</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <Calendar className="w-4 h-4 text-[#8065E8] shrink-0" />
                  <span>One-click calendar sync (.ics)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link
                to="/user/signup"
                className="w-full py-3.5 px-4 bg-[#8065E8] hover:bg-[#6f54d6] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#8065E8]/20 transition flex items-center justify-center gap-2 no-underline"
              >
                <span>Continue as Attendee</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center">
                <span className="text-xs text-[#737783]">
                  Already have an account?{" "}
                  <Link
                    to="/user/signin"
                    className="text-[#8065E8] font-bold hover:underline no-underline"
                  >
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>

          {/* Role 2: Organizer */}
          <div className="bg-white border border-[#E9E9E7] hover:border-[#111827] rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#111827]/10 text-[#111827] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                <BarChart3 className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                For Creators & Organizers
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mt-1.5 mb-2 font-['Plus_Jakarta_Sans']">
                Publish & Monetize Events
              </h2>
              <p className="text-xs sm:text-sm text-[#737783] leading-relaxed mb-6">
                Host unforgettable experiences with AuraSpace. Configure ticket tiers, track real-time revenue, and manage gate check-ins.
              </p>

              <div className="space-y-3 pb-6 border-b border-[#E9E9E7]">
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <BarChart3 className="w-4 h-4 text-[#111827] shrink-0" />
                  <span>Real-time analytics & revenue metrics</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <Users className="w-4 h-4 text-[#111827] shrink-0" />
                  <span>Attendee check-in verification & CSV export</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#111827]">
                  <ShieldCheck className="w-4 h-4 text-[#111827] shrink-0" />
                  <span>Direct bank account payout management</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link
                to="/admin/signup"
                className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition flex items-center justify-center gap-2 no-underline"
              >
                <span>Continue as Event Manager</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center">
                <span className="text-xs text-[#737783]">
                  Already managing events?{" "}
                  <Link
                    to="/admin/signin"
                    className="text-[#111827] font-bold hover:underline no-underline"
                  >
                    Organizer Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="text-center py-6 text-xs text-[#737783] border-t border-[#E9E9E7]/60">
        &copy; {new Date().getFullYear()} AuraSpace Platform Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
