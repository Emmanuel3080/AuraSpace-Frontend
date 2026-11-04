import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminAuthContext } from "../Context/adminAuthContext";
import AuthLayout from "../Component/AuthLayout";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

const AdminForgotPasswordpage = () => {
  const { handlePasswordReset, sendOtp } = useContext(adminAuthContext);
  const { register, handleSubmit } = useForm();

  const handleSend = async (data) => {
    try {
      await handlePasswordReset(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout
      badge="Account Security"
      badgeIcon={KeyRound}
      title="Reset Password"
      description="Enter your registered organizer email address to receive an account recovery code."
      role="organizer"
      heroHeadline="Protect your operations, venues, and revenues."
      heroSubtext="AuraSpace enforces bank-grade account protections. We'll verify your identity through your registered organizer inbox."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
      heroTag="Account Protection"
      statNumber="Secure"
      statLabel="Verified OTP access for verified organizers"
    >
      <form onSubmit={handleSubmit(handleSend)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Organizer Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              required
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
              {...register("userEmail")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={sendOtp}
          className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {sendOtp ? (
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
          to="/admin/signin"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#737783] hover:text-[#111827] no-underline transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Organizer Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AdminForgotPasswordpage;
