import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { authContext } from "../Context/userContext";
import AuthLayout from "../Component/AuthLayout";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  ArrowRight,
  Sparkles,
  Camera,
} from "lucide-react";

const userSchema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});

const SignUp_Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { handleSignUp, submitting } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const checkErrors = (err) => {
    const firstError = Object.values(err)[0]?.message;
    toast.error(firstError || "Please check required fields");
  };

  return (
    <AuthLayout
      badge="Join AuraSpace"
      badgeIcon={Sparkles}
      title="Create attendee account"
      description="Book tickets, download digital passes and follow your favorite experiences."
      role="attendee"
      heroHeadline="Every great experience starts here."
      heroSubtext="Discover handpicked concerts, tech summits, and live festivals. Seamless ticketing, instant QR passes, and unforgettable memories."
      heroImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85"
      heroTag="Live Experiences & Ticketing"
      statNumber="50,000+"
      statLabel="Verified digital tickets issued"
    >
      <form onSubmit={handleSubmit(handleSignUp, checkErrors)} className="space-y-4">
        {/* Profile Avatar Upload */}
        <div className="flex items-center gap-4 p-3 bg-[#F7F6F2] rounded-2xl border border-[#E9E9E7]">
          <div className="w-13 h-13 rounded-full bg-white border border-[#E9E9E7] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-[#737783]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="profileImage"
              className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E9E9E7] hover:border-[#8065E8] rounded-xl text-xs font-bold text-[#111827] shadow-xs transition"
            >
              <Camera className="w-3.5 h-3.5 text-[#8065E8]" />
              <span>{avatarPreview ? "Change Photo" : "Upload Avatar"}</span>
            </label>
            <p className="text-[11px] text-[#737783] mt-1 truncate">
              JPG or PNG, max 5MB (Optional)
            </p>
          </div>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profileImage")}
            onChange={(e) => {
              register("profileImage").onChange(e);
              const file = e.target.files?.[0];
              if (file) setAvatarPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#8065E8] focus:ring-2 focus:ring-[#8065E8]/10 transition shadow-xs"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Email Address *
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
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
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
          disabled={submitting}
          className="w-full py-3.5 px-4 bg-[#8065E8] hover:bg-[#6f54d6] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#8065E8]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Attendee Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher Links */}
      <div className="mt-8 pt-6 border-t border-[#E9E9E7] space-y-3 text-center">
        <p className="text-xs text-[#737783]">
          Already have an account?{" "}
          <Link
            to="/user/signin"
            className="text-[#8065E8] font-bold hover:underline no-underline"
          >
            Sign in
          </Link>
        </p>
        <p className="text-xs text-[#737783]">
          Are you hosting an experience?{" "}
          <Link
            to="/admin/signup"
            className="text-[#111827] font-bold hover:underline no-underline inline-flex items-center gap-1"
          >
            <span>Register as Organizer</span>
            <span>&rarr;</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp_Page;
