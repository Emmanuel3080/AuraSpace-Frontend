import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminLayout from "./AdminLayout";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  UploadIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from "../../Common/Icons";

const eventSchema = yup.object({
  title: yup.string().required("Title field is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  eventDate: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  eventDuration: yup.string().required("Duration is required"),
  TicketsAvailable: yup.string().required("Ticket quantity is required"),
  price: yup.string().required("Price is required"),
});

const CATEGORIES = [
  "Music & Concerts",
  "Technology & Innovation",
  "Business & Networking",
  "Arts & Culture",
  "Sports & Fitness",
  "Education & Workshops",
  "Entertainment & Nightlife",
  "Community & Social",
];

const UpdateSinglePage = () => {
  const { eventId } = useParams();
  const { getSingleEvents, adminSingleEvent } = useContext(adminAuthContext);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      getSingleEvents(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    if (adminSingleEvent) {
      reset({
        title: adminSingleEvent.title || "",
        description: adminSingleEvent.description || "",
        category: adminSingleEvent.category || "",
        location: adminSingleEvent.location || "",
        eventDate: adminSingleEvent.eventDate ? adminSingleEvent.eventDate.split("T")[0] : "",
        startTime: adminSingleEvent.startTime || "",
        endTime: adminSingleEvent.endTime || "",
        eventDuration: adminSingleEvent.eventDuration || "",
        price: adminSingleEvent.price || "",
        TicketsAvailable: adminSingleEvent.TicketsAvailable || "",
        coverImage: null,
      });

      setPreview(adminSingleEvent.coverImage);
    }
  }, [adminSingleEvent, reset]);

  const updateSingleEvent = async (formData) => {
    setUpdating(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("location", formData.location);
      payload.append("eventDate", formData.eventDate);
      payload.append("startTime", formData.startTime);
      payload.append("endTime", formData.endTime);
      payload.append("eventDuration", formData.eventDuration);
      payload.append("TicketsAvailable", formData.TicketsAvailable);
      payload.append("price", formData.price);

      if (formData.coverImage && formData.coverImage[0]) {
        payload.append("coverImage", formData.coverImage[0]);
      }

      const response = await fetch(`${baseUrl}/admin/event/update/${eventId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
        },
        body: payload,
      });
      const data = await response.json();

      if (data.Status === "Success" || response.ok) {
        toast.success("Event updated successfully");
        navigate(`/dashboard`);
      } else {
        toast.error(data.message || "Failed to update event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while updating event");
    } finally {
      setUpdating(false);
    }
  };

  const handleErr = (err) => {
    const firstErr = Object.values(err)[0]?.message;
    toast.error(firstErr || "Please check required fields");
  };

  return (
    <AdminLayout title="Edit Event">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Bar & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E9E7]">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737783] hover:text-[#111827] mb-2 no-underline transition"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827] font-['Plus_Jakarta_Sans']">
              Edit Event Details
            </h1>
            <p className="text-xs text-[#737783] mt-0.5">
              Modify event information, ticketing configuration, and schedule
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8065E8]/10 text-[#8065E8]">
              <SparklesIcon className="w-3.5 h-3.5" />
              ID: {eventId ? eventId.slice(-6) : "..."}
            </span>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(updateSingleEvent, handleErr)}
          className="space-y-8"
        >
          {/* Card 1: Cover Image */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 shadow-xs">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#737783] mb-4">
              Cover Photography
            </h2>

            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-[#E9E9E7] group">
                <img
                  src={preview}
                  alt="Event Cover Preview"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  <label
                    htmlFor="coverImage"
                    className="cursor-pointer px-4 py-2 bg-white text-[#111827] font-semibold text-xs rounded-lg shadow-sm hover:bg-gray-100 transition inline-flex items-center gap-2"
                  >
                    <UploadIcon className="w-4 h-4 text-[#8065E8]" />
                    Change Photo
                  </label>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="px-4 py-2 bg-[#F45B69] text-white font-semibold text-xs rounded-lg shadow-sm hover:bg-[#F45B69]/90 transition"
                  >
                    Remove
                  </button>
                </div>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("coverImage")}
                  onChange={(e) => {
                    register("coverImage").onChange(e);
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>
            ) : (
              <label
                htmlFor="coverImage"
                className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-[#E9E9E7] hover:border-[#8065E8] rounded-xl p-10 bg-[#F7F6F2]/50 hover:bg-[#8065E8]/5 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[#8065E8] mb-3 group-hover:scale-110 transition shadow-xs">
                  <UploadIcon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-[#111827] mb-1">
                  Click to upload new cover image
                </p>
                <p className="text-xs text-[#737783]">
                  High-res 16:9 photography recommended (PNG, JPG, WebP)
                </p>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("coverImage")}
                  onChange={(e) => {
                    register("coverImage").onChange(e);
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}
          </div>

          {/* Card 2: Essential Details */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#737783]">
              Basic Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Lagos Tech Fest 2026"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] focus:ring-1 focus:ring-[#8065E8] transition"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-[#F45B69] mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                Description *
              </label>
              <textarea
                rows={4}
                placeholder="Describe the experience, schedule highlights, performers or speakers..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] focus:ring-1 focus:ring-[#8065E8] transition"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-[#F45B69] mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Category *
                </label>
                <div className="relative">
                  <select
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] focus:ring-1 focus:ring-[#8065E8] transition appearance-none"
                    {...register("category")}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <TagIcon className="w-4 h-4 text-[#737783] absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {errors.category && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Venue & Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Landmark Centre, Victoria Island, Lagos"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] focus:ring-1 focus:ring-[#8065E8] transition"
                    {...register("location")}
                  />
                  <MapPinIcon className="w-4 h-4 text-[#737783] absolute left-3 top-3" />
                </div>
                {errors.location && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Date, Time & Schedule */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#737783]">
              Date & Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                    {...register("eventDate")}
                  />
                  <CalendarIcon className="w-4 h-4 text-[#737783] absolute left-3 top-3 pointer-events-none" />
                </div>
                {errors.eventDate && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.eventDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Start Time *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                    {...register("startTime")}
                  />
                  <ClockIcon className="w-4 h-4 text-[#737783] absolute left-3 top-3 pointer-events-none" />
                </div>
                {errors.startTime && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.startTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  End Time *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                    {...register("endTime")}
                  />
                  <ClockIcon className="w-4 h-4 text-[#737783] absolute left-3 top-3 pointer-events-none" />
                </div>
                {errors.endTime && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                Event Duration *
              </label>
              <input
                type="text"
                placeholder="e.g. 4 hours, Full day"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                {...register("eventDuration")}
              />
              {errors.eventDuration && (
                <p className="text-xs text-[#F45B69] mt-1">{errors.eventDuration.message}</p>
              )}
            </div>
          </div>

          {/* Card 4: Ticketing & Capacity */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#737783]">
              Ticketing & Capacity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Regular Ticket Price (₦) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 5000 (0 for Free)"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                    {...register("price")}
                  />
                  <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-[#737783]">
                    ₦
                  </span>
                </div>
                {errors.price && (
                  <p className="text-xs text-[#F45B69] mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Tickets Available (Capacity) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 250"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E9E9E7] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#8065E8] transition"
                    {...register("TicketsAvailable")}
                  />
                  <TicketIcon className="w-4 h-4 text-[#737783] absolute left-3 top-3 pointer-events-none" />
                </div>
                {errors.TicketsAvailable && (
                  <p className="text-xs text-[#F45B69] mt-1">
                    {errors.TicketsAvailable.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 text-xs font-semibold text-[#737783] hover:text-[#111827] bg-white border border-[#E9E9E7] rounded-lg transition no-underline"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={updating}
              className="px-6 py-2.5 bg-[#8065E8] hover:bg-[#6f54d6] text-white text-xs font-semibold rounded-lg shadow-sm transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {updating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save & Update Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateSinglePage;
