import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/userContext";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useDeprecatedAnimatedState } from "framer-motion";
import { useParams } from "react-router-dom";
import Header from "../Common/Header";
import SingleEventImage from "../Component/SingleEventImage";
import EventInformation from "../Component/EventInformation";
import LocationMaop from "../Component/LocationMaop";
const SingleEventsPage = () => {
  const { getSingleEvents, adminSingleEvent } = useContext(adminAuthContext);

  const baseUrl = import.meta.env.VITE_API_URL;

  const { eventId } = useParams();

  const [bookUserTicket, setBookTicket] = useState(false);

  // const BookTicket = async () => {
  //   setBookTicket(true);
  //   try {
  //     const response = await fetch(`${baseUrl}/user/book/ticket`,
  //        {
  //         method: "POST", {
  //           Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
  //           body: JSON.stringify({
  //             eventId: eventId,
  //             quanity,
  //           }),

  //         }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setBookTicket(false);
  //   }
  // };

  useEffect(() => {
    getSingleEvents(eventId);
  }, []);
  console.log(adminSingleEvent);

  return (
    <div>
      <Header />

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
        NumberOfTickets={
          adminSingleEvent?.TicketsAvailable > adminSingleEvent?.Attendees ? (
            <div
              style={{
                background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                padding: "10px 16px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "center",
                width: "fit-content",
                boxShadow: "0 3px 8px rgba(59,130,246,0.25)",
              }}
            >
              {adminSingleEvent?.TicketsAvailable} Tickets Available
            </div>
          ) : (
            <div
              style={{
                background: "#fee2e2",
                padding: "10px 16px",
                borderRadius: "8px",
                color: "#b91c1c",
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "center",
                width: "fit-content",
                boxShadow: "0 3px 8px rgba(185,28,28,0.15)",
              }}
            >
              ❌ No Tickets Available
            </div>
          )
        }
        event={adminSingleEvent}
      />
    </div>
  );
};

export default SingleEventsPage;
