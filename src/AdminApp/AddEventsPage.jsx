import React, { useContext, useRef, useState } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import AdminLayout from "../Dashboard/Admin/AdminLayout";
import sampleEvents from "../data/sampleEvents";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "../Common/Icons";

const CATEGORIES = [
  "Music",
  "Technology",
  "Business",
  "Education",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Arts",
];

const eventSchema = yup.object({
  title: yup.string().required("Event title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Venue location is required"),
  eventDate: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  eventDuration: yup.string().required("Event duration is required"),
  TicketsAvailable: yup.string().required("Total tickets available is required"),
  price: yup.string().required("Ticket price is required"),
});

const AddEventsPage = () => {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { submitEventForm, CreateEvent } = useContext(adminAuthContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      category: "Technology",
      price: "0",
      TicketsAvailable: "100",
      eventDuration: "3 Hours",
    },
  });

  const formValues = watch();

  const nextStep = async (fieldsToValidate) => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => Math.min(4, s + 1));
    } else {
      toast.error("Please complete all required fields in this step.");
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  // Dev-only: fill the form with a random sample event
  const fillSampleEvent = async () => {
    const sample = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
    Object.entries(sample).forEach(([key, value]) =>
      setValue(key, value, { shouldValidate: true, shouldDirty: true })
    );

    // Attach the category cover image from /public/sample-events
    try {
      const imgPath = `/sample-events/${sample.category.toLowerCase()}.jpg`;
      const res = await fetch(imgPath);
      if (!res.ok) throw new Error("Image not found");
      const blob = await res.blob();
      const file = new File([blob], `${sample.category.toLowerCase()}.jpg`, {
        type: blob.type || "image/jpeg",
      });
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue("coverImage", dt.files, { shouldDirty: true });
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      console.log("Sample cover image not loaded:", err);
    }

    toast.success(`Filled with: ${sample.title}`);
  };

  const handleError = (err) => {
    const firstErr = Object.values(err)[0]?.message || "Validation error";
    toast.error(firstErr);
  };

  const stepsList = [
    { num: 1, title: "Basic Info" },
    { num: 2, title: "Date & Venue" },
    { num: 3, title: "Tickets & Pricing" },
    { num: 4, title: "Media & Publish" },
  ];

  return (
    <AdminLayout title="Create Event Wizard">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Wizard Step Progression Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E9E9E7] shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            {stepsList.map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center text-center space-y-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isPassed
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-[#111827] text-white shadow-md ring-2 ring-[#8065E8]/30"
                        : "bg-[#F7F6F2] text-[#737783] border border-[#E9E9E7]"
                    }`}
                  >
                    {isPassed ? <CheckCircleIcon className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold hidden sm:block ${
                      isCurrent ? "text-[#111827]" : "text-[#737783]"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Card */}
        <form
          onSubmit={handleSubmit(CreateEvent, handleError)}
          className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E9E9E7] shadow-sm space-y-8"
        >
          {import.meta.env.DEV && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={fillSampleEvent}
                className="px-4 py-2 rounded-xl border border-dashed border-[#8065E8] text-[#8065E8] text-xs font-bold uppercase tracking-wider bg-transparent cursor-pointer"
              >
                Fill with sample event (dev)
              </button>
            </div>
          )}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                  Step 1 of 4
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-0.5">
                  Basic Event Information
                </h3>
                <p className="text-xs text-[#737783]">
                  Give your event a memorable title, category, and an engaging description.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="e.g. Lagos Tech Fest 2026"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                  {errors.title && (
                    <p className="text-xs text-rose-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8] bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Event Description *
                  </label>
                  <textarea
                    rows={5}
                    {...register("description")}
                    placeholder="Tell attendees what to expect, who is speaking, and highlights..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                  {errors.description && (
                    <p className="text-xs text-rose-500">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={() => nextStep(["title", "category", "description"])}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all border-0 cursor-pointer"
                >
                  <span>Continue to Date & Venue</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Venue */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                  Step 2 of 4
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-0.5">
                  Date, Time & Venue
                </h3>
                <p className="text-xs text-[#737783]">
                  Specify when and where the experience will happen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Venue Address / Location *
                  </label>
                  <input
                    type="text"
                    {...register("location")}
                    placeholder="e.g. Landmark Centre, Water Corporation Drive, Victoria Island, Lagos"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                  {errors.location && (
                    <p className="text-xs text-rose-500">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    {...register("eventDate")}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8] bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Duration (e.g. 4 Hours) *
                  </label>
                  <input
                    type="text"
                    {...register("eventDuration")}
                    placeholder="e.g. 4 Hours"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    {...register("startTime")}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8] bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    End Time *
                  </label>
                  <input
                    type="time"
                    {...register("endTime")}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8] bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E9E9E7] text-xs font-bold uppercase tracking-wider text-[#737783] hover:text-[#111827] bg-transparent cursor-pointer"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    nextStep(["location", "eventDate", "startTime", "endTime", "eventDuration"])
                  }
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all border-0 cursor-pointer"
                >
                  <span>Continue to Tickets</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Tickets & Pricing */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                  Step 3 of 4
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-0.5">
                  Tickets & Pricing
                </h3>
                <p className="text-xs text-[#737783]">
                  Set ticket capacity and the admission price in Nigerian Naira (₦).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Base Ticket Price (₦) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("price")}
                    placeholder="0 for free event, e.g. 5000"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                  <p className="text-[11px] text-[#737783]">
                    Enter 0 to list as a Free Admission event.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Total Tickets Available (Capacity) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("TicketsAvailable")}
                    placeholder="e.g. 250"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9E9E7] text-sm text-[#111827] outline-none focus:border-[#8065E8]"
                  />
                  <p className="text-[11px] text-[#737783]">
                    Maximum number of tickets that can be sold.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E9E9E7] text-xs font-bold uppercase tracking-wider text-[#737783] hover:text-[#111827] bg-transparent cursor-pointer"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => nextStep(["price", "TicketsAvailable"])}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all border-0 cursor-pointer"
                >
                  <span>Continue to Cover Media</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Cover Image, Live Preview & Publish */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
                  Step 4 of 4
                </span>
                <h3 className="text-2xl font-extrabold text-[#111827] mt-0.5">
                  Cover Image & Review
                </h3>
                <p className="text-xs text-[#737783]">
                  Upload an event cover image and review your listing before going live.
                </p>
              </div>

              {/* Cover Upload Drag & Drop Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block">
                  Event Cover Photo
                </label>

                {!preview ? (
                  <label
                    htmlFor="cover-image-input"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#E9E9E7] hover:border-[#8065E8] rounded-3xl bg-[#F7F6F2] cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8065E8] mb-3">
                      <SparklesIcon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#111827]">
                      Click to upload event banner
                    </span>
                    <span className="text-xs text-[#737783] mt-1">
                      PNG, JPG, or WEBP (Recommended: 16:9 or 16:10 ratio)
                    </span>
                    <input
                      id="cover-image-input"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      {...register("coverImage", {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) setPreview(URL.createObjectURL(file));
                        },
                      })}
                    />
                  </label>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden border border-[#E9E9E7] max-h-72">
                    <img
                      src={preview}
                      alt="Event Preview"
                      className="w-full h-72 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#111827]/80 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer border-0"
                    >
                      Change Photo
                    </button>
                  </div>
                )}
              </div>

              {/* Live Card Preview Box */}
              <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737783] block">
                  Listing Summary
                </span>
                <h4 className="font-bold text-base text-[#111827]">
                  {formValues.title || "Your Event Title"}
                </h4>
                <div className="flex flex-wrap gap-4 text-xs text-[#737783]">
                  <span>📅 {formValues.eventDate || "Date"}</span>
                  <span>📍 {formValues.location || "Venue"}</span>
                  <span>🎟 {formValues.TicketsAvailable || "0"} Tickets</span>
                  <span className="font-bold text-[#111827]">
                    💰 ₦{Number(formValues.price || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Final Wizard Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E9E9E7] text-xs font-bold uppercase tracking-wider text-[#737783] hover:text-[#111827] bg-transparent cursor-pointer"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={submitEventForm}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all border-0 cursor-pointer"
                >
                  {submitEventForm ? (
                    <span>Publishing Event...</span>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4" />
                      <span>Publish Event to Marketplace</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEventsPage;
