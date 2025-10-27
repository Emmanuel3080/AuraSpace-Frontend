import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminCreatEventHeader from "../../Common/AdminCreatEventHeader";

const eventSchema = yup.object({
  title: yup.string().required("Title field is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category Field is Required"),
  location: yup.string().required("Location Is Required"),
  eventDate: yup.string().required("Event Date Is Required"),
  startTime: yup.string().required("Start Time Is Required"),
  endTime: yup.string().required("End Time Required"),
  eventDuration: yup.string().required("eventDuration is required"),

  // eventMode: yup.string().required("Event Mode is required"),
  // meetingLink: yup.string().required("meetingLink is required"),
  // priceCategory: yup.string().required("priceCategory is required"),
  TicketsAvailable: yup.string().required("TicketsAvailable is required"),
  price: yup.string().required("price is required"),
});
const UpdateSinglePage = () => {
  const { eventId } = useParams();
  const { getSingleEvents, adminSingleEvent } = useContext(adminAuthContext);
  const [updateEventData, setUpdating] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const baseUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    getSingleEvents(eventId);
  }, []);
  useEffect(() => {
    if (adminSingleEvent) {
      reset({
        title: adminSingleEvent.title,
        description: adminSingleEvent.description,
        category: adminSingleEvent.category,
        location: adminSingleEvent.location,
        eventDate: adminSingleEvent.eventDate,
        startTime: adminSingleEvent.startTime,
        endTime: adminSingleEvent.endTime,
        eventDuration: adminSingleEvent.eventDuration,
        price: adminSingleEvent.price,
        TicketsAvailable: adminSingleEvent.TicketsAvailable,
        coverImage: null,
      });

      setPreview(adminSingleEvent.coverImage);
    }
  }, [adminSingleEvent, reset]);

  //   useEffect(() => {});

  const updateSingleEvent = async (formData) => {
    setUpdating(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("location", formData.location);
      payload.append("eventDate", formData.eventDate);
      payload.append("endTime", formData.endTime);
      payload.append("startTime", formData.startTime);
      payload.append("eventDuration", formData.eventDuration);
      // payload.append("eventMode", payload.eventMode);
      // payload.append("meetingLink", payload.meetingLink);
      // payload.append("priceCategory", payload.priceCategory);
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
      console.log(data);
      const managerId = data.event.createdBy._id;
      if (data.Status == "Success") {
        toast.success("Event Updated Succesfully");
        navigate(`/dashboard`);
      } else {
        toast.error("Failed to update Event");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };
  console.log(adminSingleEvent);

  const handleErr = (err) => {
    const firstErr = Object.values(err)[0].message;
    toast.error(firstErr || "Failed to update Events");
  };

  const [upload, setUpload] = useState(false);

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <AdminCreatEventHeader />

      <div className="flex justify-center px-4 py-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Update Event
          </h1>

          <form
            onSubmit={handleSubmit(updateSingleEvent, handleErr)}
            className="space-y-8"
          >
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Cover Image
              </label>
              {!preview ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <i className="fa fa-upload"></i>
                    Upload Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("coverImage")}
                    onChange={(e) => {
                      register("coverImage").onChange(e);
                      const file = e.target.files[0];
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <img
                    src={preview || adminSingleEvent.coverImage}
                    alt="Event Cover"
                    className="rounded-lg w-full max-h-full object-cover"
                  />
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setPreview(null)}
                  >
                    Change Image
                  </button>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              {/* <h2 className="text-lg font-semibold text-gray-800">
              Event Overview
            </h2> */}

              <div className="my-4 space-y-1">
                <label className="block text-xl font-semibold mb-3">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  {...register("title")}
                />
              </div>

              <div className="my-2 space-y-1">
                <label htmlFor="" className="block text-xl font-semibold my-3">
                  Description
                </label>
                <textarea
                  placeholder="Event Description"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  {...register("description")}
                ></textarea>
              </div>

              <div className="my-4 space-y-1">
                <label htmlFor="" className="block text-xl font-semibold my-3 ">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category e.g (Concert, Conference)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                  {...register("category")}
                />
              </div>

              <div className="my-4 space-y-1">
                <label
                  htmlFor=""
                  className=" block text-xl font-semibold font-inter my-3 "
                >
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Event Location e.g (Lagos, Abuja, UK)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  {...register("location")}
                />
              </div>
            </div>

            {/* Date & Time */}

            <div></div>
            <div className="space-y-4 my-3">
              <label
                htmlFor=""
                className="text-xl font-semibold text-gray-800 my-2"
              >
                Event Date & Time
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="">Event Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("eventDate")}
                  />
                </div>

                <div>
                  <label htmlFor="">Start Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("startTime")}
                  />
                </div>

                <div>
                  <label htmlFor="">End Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("endTime")}
                  />
                </div>
              </div>

              <div className="space-y-1 my-3">
                <label
                  htmlFor=""
                  className="text-xl font-semibold font-inter my-2"
                >
                  Event Duration
                </label>
                <input
                  type="text"
                  placeholder="Duration (e.g 2 hours)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  {...register("eventDuration")}
                />
              </div>
            </div>

            {/* Price & Tickets */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Price & Tickets
              </h2>
              <input
                type="number"
                placeholder="Price"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                {...register("price")}
              />

              <div className="space-y-1 my-3">
                <label htmlFor="" className="text-xl font-semibold  my-2">
                  Number of Tickets Available(To be Sold)
                </label>

                <input
                  type="number"
                  placeholder="Number of Tickets Available"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black-100"
                  {...register("TicketsAvailable")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                disabled={updateEventData}
              >
                {updateEventData ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    Updating Event{" "}
                    <span
                      className="spinner-border spinner-border-sm me-2 "
                      role="status"
                    >
                      <span className="visually-hidden">Creating...</span>
                    </span>
                  </div>
                ) : (
                  "Update Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSinglePage;
