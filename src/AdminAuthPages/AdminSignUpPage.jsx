import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { adminAuthContext } from "../Context/adminAuthContext";
import AuthLayout from "../Component/AuthLayout";
import {
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building,
  CreditCard,
  ArrowRight,
  BarChart3,
  Camera,
  ShieldCheck,
} from "lucide-react";

const formSchema = yup.object({
  OrganizerName: yup.string().required("Organizer / Organization name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  PhoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  bankAccount: yup.string().required("Bank name is required"),
  accountNumber: yup.string().required("Account number is required"),
});

const POPULAR_BANKS = [
  "Access Bank",
  "GTBank (Guaranty Trust)",
  "Zenith Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Kuda Bank",
  "Opay",
  "Moniepoint MFB",
  "Stanbic IBTC Bank",
  "Fidelity Bank",
  "Sterling Bank",
  "Wema Bank / ALAT",
];

const AdminSignUpPage = () => {
  const { adminSignUp, submitting } = useContext(adminAuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleErr = (err) => {
    const firstError = Object.values(err)[0]?.message;
    toast.error(firstError || "Please check required fields");
  };

  return (
    <AuthLayout
      badge="Organizer Portal"
      badgeIcon={BarChart3}
      title="Create Organizer Workspace"
      description="Host experiences, configure multi-tier tickets, and receive direct revenue payouts."
      role="organizer"
      heroHeadline="The operating system for modern event creators."
      heroSubtext="From boutique intimate gatherings to stadium-scale conferences. Publish tickets, verify attendees at the gate, and receive instant payouts."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
      heroTag="Enterprise Ready"
      statNumber="99.9%"
      statLabel="Uptime on ticket gateway check-ins"
    >
      <form onSubmit={handleSubmit(adminSignUp, handleErr)} className="space-y-4">
        {/* Brand Logo / Photo Upload */}
        <div className="flex items-center gap-4 p-3 bg-[#F7F6F2] rounded-2xl border border-[#E9E9E7]">
          <div className="w-13 h-13 rounded-full bg-white border border-[#E9E9E7] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-6 h-6 text-[#737783]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="AdminProfileImg"
              className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E9E9E7] hover:border-[#111827] rounded-xl text-xs font-bold text-[#111827] shadow-xs transition"
            >
              <Camera className="w-3.5 h-3.5 text-[#111827]" />
              <span>{avatarPreview ? "Change Logo" : "Upload Brand Logo"}</span>
            </label>
            <p className="text-[11px] text-[#737783] mt-1 truncate">
              Brand icon or organizer headshot
            </p>
          </div>
          <input
            id="AdminProfileImg"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("AdminProfileImg")}
            onChange={(e) => {
              register("AdminProfileImg").onChange(e);
              const file = e.target.files?.[0];
              if (file) setAvatarPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Organizer / Brand Name */}
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1.5">
            Organizer / Brand Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
              {...register("OrganizerName")}
            />
          </div>
          {errors.OrganizerName && (
            <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.OrganizerName.message}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Phone / WhatsApp *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737783]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                placeholder="+234 801 234 5678"
                className="w-full pl-10 pr-3.5 py-3 bg-white border border-[#E9E9E7] rounded-xl text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 transition shadow-xs"
                {...register("PhoneNumber")}
              />
            </div>
            {errors.PhoneNumber && (
              <p className="text-xs text-[#F45B69] mt-1.5 font-medium">{errors.PhoneNumber.message}</p>
            )}
          </div>
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

        {/* Direct Payout Section */}
        <div className="p-4 bg-[#F7F6F2] rounded-2xl border border-[#E9E9E7] space-y-3 mt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111827]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ticket Revenue Payout Bank</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Bank Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737783]">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <input
                  list="banksList"
                  type="text"
                  placeholder="e.g. GTBank"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827]"
                  {...register("bankAccount")}
                />
                <datalist id="banksList">
                  {POPULAR_BANKS.map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </div>
              {errors.bankAccount && (
                <p className="text-xs text-[#F45B69] mt-1">{errors.bankAccount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Account Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737783]">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  maxLength="10"
                  placeholder="10-digit NUBAN"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] placeholder:text-[#737783]/60 focus:outline-none focus:border-[#111827]"
                  {...register("accountNumber")}
                />
              </div>
              {errors.accountNumber && (
                <p className="text-xs text-[#F45B69] mt-1">{errors.accountNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 px-4 bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#111827]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Organizer Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher Links */}
      <div className="mt-8 pt-6 border-t border-[#E9E9E7] space-y-3 text-center">
        <p className="text-xs text-[#737783]">
          Already have an organizer workspace?{" "}
          <Link
            to="/admin/signin"
            className="text-[#111827] font-bold hover:underline no-underline"
          >
            Sign in
          </Link>
        </p>
        <p className="text-xs text-[#737783]">
          Looking to purchase tickets instead?{" "}
          <Link
            to="/user/signup"
            className="text-[#8065E8] font-bold hover:underline no-underline inline-flex items-center gap-1"
          >
            <span>Attendee Account</span>
            <span>&rarr;</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default AdminSignUpPage;
