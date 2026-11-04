import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "../Component/AuthLayout";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const passwordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});

const AdminChangePassword = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [resetting, setResetting] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleError = (err) => {
    const firstError = Object.values(err)[0]?.message;
    toast.error(firstError || "Please check your password requirements");
  };

  const changeAdminPassword = async (formData) => {
    setResetting(true);
    try {
      const response = await fetch(
        `${baseUrl}/admin/change/password?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.Status === "Success" || response.ok) {
        toast.success("Password updated successfully! Please sign in.");
        navigate("/admin/signin");
      } else {
        toast.error(data.Message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while updating password");
    } finally {
      setResetting(false);
    }
  };

  return (
    <AuthLayout
      badge="Account Security"
      badgeIcon={KeyRound}
      title="Set New Password"
      description="Choose a strong password to protect your event operations and revenue."
      role="organizer"
      heroHeadline="Protect your operations, venues, and revenues."
      heroSubtext="Once updated, you can sign in to your organizer account and resume managing your live events and ticket sales."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
      heroTag="Account Security"
      statNumber="Protected"
      statLabel="Bcrypt hashed & encrypted authentication"
    >
      <form onSubmit={handleSubmit(changeAdminPassword, handleError)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            New Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              className="w-full pl-10 pr-10 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#737783] hover:text-[#111827] focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={resetting}
          className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {resetting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <span>Save Password</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#E9E9E7] text-center">
        <Link
          to="/admin/signin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737783] hover:text-[#111827] no-underline transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Organizer Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AdminChangePassword;
