import React, { useContext, useEffect } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useParams, Link } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import SingleEventImage from "../Component/SingleEventImage";
import EventInformation from "../Component/EventInformation";
import EventExpiredCard from "../Component/EventExpiredCard";

const SingleEventsPage = () => {
  const { getSingleEvents, adminSingleEvent, updateEventData } = useContext(adminAuthContext);
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      getSingleEvents(eventId);
    }
  }, [eventId]);

  if (updateEventData || !adminSingleEvent) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-10 h-10 border-4 border-[#8065E8] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-[#737783]">Loading event experience...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const hasEventExpired = adminSingleEvent?.eventDate
    ? new Date(adminSingleEvent?.eventDate).getTime() < Date.now()
    : false;

  if (hasEventExpired) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 w-full">
          <EventExpiredCard />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
      <Header />

      <main className="flex-1">
        <SingleEventImage
          link={adminSingleEvent?.coverImage}
          alt={adminSingleEvent?.title}
        />

        <EventInformation
          startDate={adminSingleEvent?.eventDate || "Not Set"}
          eventTitle={adminSingleEvent?.title}
          eventDescription={adminSingleEvent?.description}
          isPublished={adminSingleEvent?.status}
          eventPrice={adminSingleEvent?.price}
          eventCategory={adminSingleEvent?.category}
          eventStartTime={adminSingleEvent?.startTime}
          eventEndTime={adminSingleEvent?.endTime}
          eventLocation={adminSingleEvent?.location}
          organizerName={adminSingleEvent?.createdBy?.OrganizerName}
          organizerPicture={adminSingleEvent?.createdBy?.AdminProfileImg}
          organizerContact={adminSingleEvent?.createdBy?.PhoneNumber}
          eventDate={adminSingleEvent?.startTime}
          eventName={adminSingleEvent?.title}
          event={adminSingleEvent}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SingleEventsPage;
