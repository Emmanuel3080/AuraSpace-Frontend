import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Ticket,
  Calendar,
  Users,
  Compass,
  Star,
  CheckCircle2,
} from "lucide-react";

/**
 * Premium Split-Screen Authentication Layout for Auraspace
 * 
 * Left Panel (~45% desktop):
 * - Immersive event atmosphere background with subtle dark overlay
 * - Auraspace custom branding & home navigation
 * - Compelling headline: "Every great experience starts here."
 * - Supporting description & floating live experience card
 * 
 * Right Panel (~55% desktop):
 * - Clean off-white canvas with centered, touch-friendly form
 * - Full responsive adaptation (compact branded header on mobile)
 */
const AuthLayout = ({
  children,
  badge = "Attendee Access",
  badgeIcon: BadgeIcon = Sparkles,
  title = "Welcome back",
  description = "Sign in to manage your bookings and view your digital tickets",
  role = "attendee", // "attendee" | "organizer"
  heroHeadline = "Every great experience starts here.",
  heroSubtext = "Discover handpicked concerts, tech summits, and live festivals. Seamless ticketing, instant QR passes, and unforgettable memories.",
  heroImage = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85",
  heroTag = "Live Experiences & Ticketing",
  statNumber = "50,000+",
  statLabel = "Tickets booked across 200+ top live events",
}) => {
  const isOrganizer = role === "organizer";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-[#8065E8] selection:text-white font-sans">
      {/* ========================================================================= */}
      {/* LEFT PANEL: Brand Experience (approx. 45% on desktop, hidden on small screens) */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[46%] relative bg-[#111827] text-white flex-col justify-between overflow-hidden p-10 xl:p-14 shrink-0">
        {/* Background Image with Rich Event Visuals */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        />

        {/* Multi-layer Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-[#111827]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(128,101,232,0.25),transparent_60%)]" />

        {/* Decorative Grid Mesh */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Header: Logo & Back to Events Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8065E8] to-[#F45B69] flex items-center justify-center text-white shadow-lg shadow-[#8065E8]/30 group-hover:scale-105 transition-transform duration-200">
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
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl tracking-tight text-white leading-none">
                Aura<span className="text-[#F45B69]">space</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 mt-0.5">
                {isOrganizer ? "Organizer Portal" : "Event Platform"}
              </span>
            </div>
          </Link>

          {/* <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md transition no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Events</span>
          </Link> */}
        </div>

        {/* Middle Content: Headline, Description & Floating Glassmorphism Experience Card */}
        <div className="relative z-10 space-y-8 my-auto py-12">
          <div className="space-y-4 max-w-lg">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md text-white border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#F45B69] animate-pulse" />
              {heroTag}
            </span>

            <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-[1.2] font-['Plus_Jakarta_Sans']">
              {heroHeadline}
            </h2>

            <p className="text-sm xl:text-base text-white/80 leading-relaxed font-normal">
              {heroSubtext}
            </p>
          </div>

          {/* Floating Glassmorphism Social Proof & Live Experience Card */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 space-y-4 max-w-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8065E8]/30 flex items-center justify-center text-[#8065E8] border border-[#8065E8]/40">
                  <Ticket className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {isOrganizer ? "Real-Time Revenue Tracking" : "Seamless QR Check-ins"}
                  </p>
                  <p className="text-[11px] text-white/70">
                    {isOrganizer ? "Direct bank settlements & analytics" : "Offline verified digital entry"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Verified</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#111827] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Attendee"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#111827] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Attendee"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#111827] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                    alt="Attendee"
                  />
                </div>
                <span className="font-semibold text-white">{statNumber}</span>
              </div>

              <span className="text-[11px] text-white/70 truncate max-w-[190px]">
                {statLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Left Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          {/* <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Bank-grade 256-bit SSL Security</span>
          </div> */}
          <span>&copy; {new Date().getFullYear()} AuraSpace</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT PANEL: Authentication Form (approx. 55% desktop, 100% mobile)       */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#F7F6F2] lg:bg-white overflow-y-auto min-h-screen lg:min-h-0">
        {/* Mobile Header: Visible only on < lg screens */}
        <div className="lg:hidden flex items-center justify-between pb-6 border-b border-[#E9E9E7]">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8065E8] to-[#F45B69] flex items-center justify-center text-white shadow">
              <svg
                className="w-4 h-4"
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
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight text-[#111827]">
              Aura<span className="text-[#F45B69]">space</span>
            </span>
          </Link>

          <Link
            to="/"
            className="text-xs font-semibold text-[#737783] hover:text-[#111827] flex items-center gap-1 no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore</span>
          </Link>
        </div>

        {/* Centered Form Wrapper */}
        <div className="w-full max-w-md mx-auto my-auto py-8 sm:py-10">
          <div className="bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none border lg:border-0 border-[#E9E9E7] shadow-sm lg:shadow-none space-y-6">
            {/* Header Badge & Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8065E8]/10 text-[#8065E8]">
                <BadgeIcon className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-['Plus_Jakarta_Sans']">
                {title}
              </h1>

              <p className="text-xs sm:text-sm text-[#737783] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Injected Form Body */}
            <div>{children}</div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Footer */}
        {/* <div className="pt-6 border-t border-[#E9E9E7] text-center text-xs text-[#737783] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} AuraSpace Platform Inc.</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-[#111827] no-underline">
              About
            </Link>
            <span>&bull;</span>
            <Link to="/events" className="hover:text-[#111827] no-underline">
              Events
            </Link>
            <span>&bull;</span>
            <span className="text-[#737783]">Secure Ticketing</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;
