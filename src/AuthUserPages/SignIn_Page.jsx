import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { authContext } from "../Context/userContext";
import AuthLayout from "../Component/AuthLayout";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Ticket,
} from "lucide-react";

const userSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignIn_Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignIn, submitUserLogin } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleError = (err) => {
    const firstErr = Object.values(err)[0]?.message;
    toast.error(firstErr || "Please fill in the required fields");
  };

  const handleUserData = async (data) => {
    try {
      await handleSignIn(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in. Please check credentials.");
    }
  };

  return (
    <AuthLayout
      badge="Attendee Access"
      badgeIcon={Sparkles}
      title="Welcome back"
      description="Sign in to manage your bookings, download passes and view digital tickets."
      role="attendee"
      heroHeadline="Every great experience starts here."
      heroSubtext="Discover handpicked concerts, tech summits, and live festivals. Seamless ticketing, instant QR passes, and unforgettable memories."
      heroImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85"
      heroTag="Live Experiences & Ticketing"
      statNumber="50,000+"
      statLabel="Verified digital tickets issued"
    >
      <form onSubmit={handleSubmit(handleUserData, handleError)} className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#8065E8] focus:ring-2 focus:ring-[#8065E8]/10 transition shadow-xs"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[#111827]">
              Password
            </label>
            <Link
              to="/forgot/password"
              className="text-xs font-semibold text-[#8065E8] hover:underline no-underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#8065E8] focus:ring-2 focus:ring-[#8065E8]/10 transition shadow-xs"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitUserLogin}
          className="w-full py-3.5 px-4 bg-[#8065E8] hover:bg-[#6f54d6] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#8065E8]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {submitUserLogin ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to AuraSpace</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher Links */}
      <div className="mt-8 pt-6 border-t border-[#E9E9E7] space-y-3 text-center">
        <p className="text-xs text-[#737783]">
          Don't have an attendee account?{" "}
          <Link
            to="/user/signup"
            className="text-[#8065E8] font-bold hover:underline no-underline"
          >
            Create account
          </Link>
        </p>
        <p className="text-xs text-[#737783]">
          Are you hosting an event?{" "}
          <Link
            to="/admin/signin"
            className="text-[#111827] font-bold hover:underline no-underline inline-flex items-center gap-1"
          >
            <span>Organizer Login</span>
            <span>&rarr;</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn_Page;
