import React, { useContext, useRef, useState } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

const eventSchema = yup.object({
  title: yup.string().required("Title field is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category field is required"),
  location: yup.string().required("Location is required"),
  eventDate: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  eventDuration: yup.string().required("Event duration is required"),
  TicketsAvailable: yup.string().required("Tickets available is required"),
  price: yup.string().required("Price is required"),
});

const AddEventsPage = () => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { submitEventForm, CreateEvent } = useContext(adminAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      priceCategory: "free",
      price: 0,
    },
  });

  const handleError = (err) => {
    const firstErr = Object.values(err)[0].message;
    toast.error(firstErr);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <form
          onSubmit={handleSubmit(CreateEvent, handleError)}
          className="space-y-6"
        >
          {/* Image Upload */}
          <div>
            {!preview ? (
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400"
              >
                <i className="fa fa-upload text-gray-500 text-2xl mb-2"></i>
                <span className="text-sm text-gray-600">
                  Upload Event Cover Image
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  {...register("coverImage", {
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                />
              </label>
            ) : (
              <div className="space-y-2">
                <h1 className="text-sm font-semibold">Event Cover Image</h1>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  onClick={handleUpdate}
                  className="text-blue-600 text-sm flex items-center gap-1"
                >
                  <i className="fa fa-upload"></i> Change Image
                </button>
              </div>
            )}
          </div>

          {/* Event Title */}
          <div className="space-y-1  my-3">
            <label className="block text-sm font-semibold mb-3">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
              
            )}
          </div>

          {/* Description */}
          <div className="space-y-1  my-3">
            <label className="block text-sm font-semibold mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe Your Event"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1  my-3">
            <label className="block text-sm font-semibold mb-1">Category</label>
            <input
              type="text"
              placeholder="e.g. Concert, Conference"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Venue */}
          <div className="space-y-1  my-3">
            <label className="block text-sm font-semibold mb-1">Venue</label>
            <input
              type="text"
              placeholder="e.g. Lagos, Abuja, UK"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="space-y-1  my-4">
            <h1 className="text-sm font-semibold mb-2">Event Date & Time</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="mb-2">
                <label className="block text-xs mb-1">Event Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  {...register("eventDate")}
                />
                {errors.eventDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="block text-xs mb-1">Start Time</label>
                <input
                  type="time"
                  className="w-full border rounded-lg p-2"
                  {...register("startTime")}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs mb-1">End Time</label>
                <input
                  type="time"
                  className="w-full border rounded-lg p-2"
                  {...register("endTime")}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs mb-1">Duration</label>
              <input
                type="text"
                placeholder="Duration"
                className="w-full border rounded-lg p-2"
                {...register("eventDuration")}
              />
              {errors.eventDuration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.eventDuration.message}
                </p>
              )}
            </div>
          </div>

          {/* Price Details */}
          <div>
            <h1 className="text-sm font-semibold mb-2">Price Details</h1>
            <input
              type="number"
              placeholder="Price"
              className="w-full border rounded-lg p-2 mb-3"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}

            <div>
              <h1 className="text-sm font-inter font-semibold mb-2 text-gray-800">
                Number of Tickets Available(To be Sold)
              </h1>
              <input
                type="number"
                placeholder="Number of Tickets Available"
                className="w-full border rounded-lg p-2"
                {...register("TicketsAvailable")}
              />
              {errors.TicketsAvailable && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.TicketsAvailable.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
            >
              {submitEventForm ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  Creating Event{" "}
                  <span
                    className="spinner-border spinner-border-sm me-2 "
                    role="status"
                  >
                    <span className="visually-hidden">Creating...</span>
                  </span>
                </div>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventsPage;
