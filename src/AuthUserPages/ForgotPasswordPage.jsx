import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authContext } from "../Context/userContext";
import AuthLayout from "../Component/AuthLayout";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

const ForgotPasswordPage = () => {
  const { forgotPasswordEmail, sendUserOtp } = useContext(authContext);
  const { register, handleSubmit } = useForm();

  const handleSend = async (data) => {
    try {
      await forgotPasswordEmail(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout
      badge="Account Recovery"
      badgeIcon={KeyRound}
      title="Reset Your Password"
      description="Enter your registered email address and we'll send a 6-digit verification code to recover your account."
      role="attendee"
      heroHeadline="Regain access to your moments."
      heroSubtext="Your tickets, bookings, and account details remain safe and encrypted. We'll help you get back to your experiences in just a few clicks."
      heroImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85"
      heroTag="Account Protection"
      statNumber="100% Secure"
      statLabel="Encrypted verification & instant recovery"
    >
      <form onSubmit={handleSubmit(handleSend)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Registered Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              required
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#8065E8] focus:ring-2 focus:ring-[#8065E8]/10 transition shadow-xs"
              {...register("userEmail")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={sendUserOtp}
          className="w-full py-3.5 px-4 bg-[#8065E8] hover:bg-[#6f54d6] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#8065E8]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {sendUserOtp ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending Code...</span>
            </>
          ) : (
            <>
              <span>Send Recovery Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#E9E9E7] text-center">
        <Link
          to="/user/signin"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#737783] hover:text-[#111827] no-underline transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
