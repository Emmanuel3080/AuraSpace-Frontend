import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { adminAuthContext } from "../Context/adminAuthContext";
import AuthLayout from "../Component/AuthLayout";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  Building2,
} from "lucide-react";

const adminSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const AdminSign_InPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { adminSignIn, submitAdminLogin } = useContext(adminAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const handleError = (err) => {
    const firstErr = Object.values(err)[0]?.message;
    toast.error(firstErr || "Please fill in the required fields");
  };

  const handleSignIn = async (data) => {
    try {
      await adminSignIn(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in to organizer workspace");
    }
  };

  return (
    <AuthLayout
      badge="Organizer Workspace"
      badgeIcon={BarChart3}
      title="Sign in to your Organizer Account"
      description="Manage your published experiences, track tier sales, and monitor real-time revenue."
      role="organizer"
      heroHeadline="Command every stage, crowd, and ticket."
      heroSubtext="A complete operations suite built for modern event creators. Real-time gross volume, automated check-in rosters, and instant direct bank payouts."
      heroImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85"
      heroTag="Organizer Portal"
      statNumber="₦120M+"
      statLabel="Processed in organizer payouts"
    >
      <form onSubmit={handleSubmit(handleSignIn, handleError)} className="space-y-4">
        {/* Email Address */}
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
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
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
              to="/admin/forgot/password"
              className="text-xs font-semibold text-[#737783] hover:text-[#111827] hover:underline no-underline"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitAdminLogin}
          className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {submitAdminLogin ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In as Organizer</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher Links */}
      <div className="mt-8 pt-6 border-t border-[#E9E9E7] space-y-3 text-center">
        <p className="text-xs text-[#737783]">
          New event creator or agency?{" "}
          <Link
            to="/admin/signup"
            className="text-[#111827] font-bold hover:underline no-underline"
          >
            Register as an organizer
          </Link>
        </p>
        <p className="text-xs text-[#737783]">
          Looking to purchase tickets?{" "}
          <Link
            to="/user/signin"
            className="text-[#8065E8] font-bold hover:underline no-underline inline-flex items-center gap-1"
          >
            <span>Attendee Login</span>
            <span>&rarr;</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default AdminSign_InPage;
