import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthLayout from "../Component/AuthLayout";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  BarChart3,
} from "lucide-react";

const AdminVerifyOtp = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "organizer email";
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";
  const { register, handleSubmit } = useForm();

  const verifyOtp = async (formData) => {
    setVerifying(true);
    try {
      const otpCode = Object.values(formData).join("");
      const response = await fetch(
        `${baseUrl}/admin/verify/otp?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpCode }),
        }
      );
      const data = await response.json();

      if (data.Status === "Success" || data.Status === "Sucesss" || response.ok) {
        toast.success("Organizer OTP verified");
        navigate(`/admin/change/password?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.Message || "Invalid OTP code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP code");
    } finally {
      setVerifying(false);
    }
  };

  const generateNewOtp = async () => {
    setResending(true);
    try {
      const response = await fetch(
        `${baseUrl}/admin/generate/new/otp?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.Status === "Success" || response.ok) {
        toast.success("New OTP code sent to your organizer inbox");
      } else {
        toast.error(data.Message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while resending OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      badge="Account Security"
      badgeIcon={ShieldCheck}
      title="Verify OTP"
      description={`Enter the 6-digit confirmation code sent to ${email} to verify your identity.`}
      role="organizer"
      heroHeadline="Two-step authentication for organizer control."
      heroSubtext="AuraSpace protects your event data, ticket quotas, and financial transactions with two-factor email verification."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
      heroTag="Account Security"
      statNumber="Protected"
      statLabel="Verified OTP access for verified organizers"
    >
      <form onSubmit={handleSubmit(verifyOtp)} className="space-y-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              id={`admin-otp-${i}`}
              type="text"
              maxLength="1"
              autoComplete="one-time-code"
              className="w-12 h-14 text-center text-xl font-extrabold text-[#111827] bg-[#F7F6F2] border border-[#E9E9E7] rounded-xl focus:outline-none focus:border-[#111827] focus:bg-white focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
              {...register(`digit${i + 1}`, { required: true })}
              onInput={(e) => {
                if (e.target.value.length === 1 && i < 5) {
                  document.getElementById(`admin-otp-${i + 1}`)?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !e.target.value && i > 0) {
                  document.getElementById(`admin-otp-${i - 1}`)?.focus();
                }
              }}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={verifying}
          className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {verifying ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#E9E9E7] space-y-3 text-center">
        <p className="text-xs text-[#737783]">
          Didn't receive the email code?{" "}
          <button
            type="button"
            onClick={generateNewOtp}
            disabled={resending}
            className="text-[#111827] font-bold hover:underline cursor-pointer bg-transparent border-0 inline-flex items-center gap-1"
          >
            {resending ? (
              <>
                <RotateCw className="w-3 h-3 animate-spin" />
                <span>Resending...</span>
              </>
            ) : (
              <span>Resend Code</span>
            )}
          </button>
        </p>
        <div>
          <Link
            to="/admin/signin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737783] hover:text-[#111827] no-underline transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Organizer Login</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AdminVerifyOtp;
