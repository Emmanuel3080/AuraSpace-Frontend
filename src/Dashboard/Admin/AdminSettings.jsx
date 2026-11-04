import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  SettingsIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "../../Common/Icons";

const AdminSettings = () => {
  const { userInfo } = useContext(adminAuthContext);
  const [updateInfo, setUpdatingInfo] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (userInfo) {
      reset({
        OrganizerName: userInfo.OrganizerName || "",
        email: userInfo.email || "",
        accountNumber: userInfo.accountNumber || "",
        bankAccount: userInfo.bankAccount || "",
        PhoneNumber: userInfo.PhoneNumber || "",
      });
    }
  }, [reset, userInfo]);

  const updateAdminInfo = async (formData) => {
    setUpdatingInfo(true);
    try {
      const response = await fetch(
        `${baseUrl}/admin/update/admin/${userInfo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.Status === "Success") {
        toast.success("Settings and payout details updated successfully!");
      } else {
        toast.error(data.Message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while updating settings.");
    } finally {
      setUpdatingInfo(false);
    }
  };

  return (
    <AdminLayout title="Settings & Payouts">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="pb-4 border-b border-[#E9E9E7] space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Account & Payout Settings
          </h2>
          <p className="text-sm text-[#737783]">
            Configure your brand identity and verified Nigerian bank account for ticket revenue settlements.
          </p>
        </div>

        {/* Payout Security Notice */}
        <div className="p-4 rounded-2xl bg-white border border-[#E9E9E7] shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 flex-shrink-0 mt-0.5">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Settlement Verification Active
            </h4>
            <p className="text-xs text-[#737783] mt-0.5 leading-relaxed">
              Ticket payouts are disbursed automatically according to Paystack's standard settlement cycle (T+1) into the verified Nigerian account below.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(updateAdminInfo)}
          className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-[#E9E9E7] shadow-sm"
        >
          {/* Section 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <span>Organizer Brand Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Brand / Organizer Name *
                </label>
                <input
                  type="text"
                  required
                  {...register("OrganizerName")}
                  placeholder="e.g. AuraSpace Live Ent."
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  {...register("email")}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("PhoneNumber")}
                  placeholder="+234..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Banking & Settlement */}
          <div className="space-y-4 pt-6 border-t border-[#E9E9E7]">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <span>Direct Bank Settlement</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  {...register("bankAccount")}
                  placeholder="e.g. Zenith Bank, GTBank, Access Bank"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  10-Digit NUBAN Account Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  {...register("accountNumber")}
                  placeholder="0123456789"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-[#E9E9E7] flex justify-end">
            <button
              type="submit"
              disabled={updateInfo}
              className="px-8 py-3.5 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all border-0 cursor-pointer flex items-center gap-2"
            >
              {updateInfo ? (
                <span>Saving Changes...</span>
              ) : (
                <span>Save Profile & Payout Settings</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
