import React, { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../../Context/userContext";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

const MyTickets = () => {
  const { getSingleBooking, singleBoooking } = useContext(authContext);
  const { bookingId } = useParams();

  useEffect(() => {
    getSingleBooking(bookingId);
  }, [bookingId]);

  const formattedDate = singleBoooking?.eventId?.eventDate
    ? new Date(singleBoooking?.eventId?.eventDate).toLocaleDateString([], {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not Set";

  const formatTime = (time) => {
    if (!time) return "Invalid Time";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const startTime = formatTime(singleBoooking?.eventId?.startTime);
  const endTime = formatTime(singleBoooking?.eventId?.endTime);

  const downloadPDF = () => {
    const input = document.getElementById("ticket-details");
    html2Canvas(input, { backgroundColor: "#ffffff", scale: 2 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();

        // Calculate the height based on actual canvas
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // If content is taller than a page, split it across pages
        let remainingHeight = pdfHeight;
        let position = 0;

        while (remainingHeight > 0) {
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          remainingHeight -= pdf.internal.pageSize.getHeight();
          if (remainingHeight > 0) {
            pdf.addPage();
            position =
              (-pdf.internal.pageSize.getHeight() *
                (pdfHeight - remainingHeight)) /
              pdfHeight;
          }
        }

        pdf.save("booking-ticket.pdf");
      }
    );
  };

  return (
    <div
      style={{ backgroundColor: "#f3f4f6" }}
      className="min-h-screen py-10 px-4 flex justify-center"
    >
      <div
        id="ticket-details"
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          border: "1px solid #e5e7eb",
          borderRadius: "24px",
          padding: "32px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Booking Confirmation
        </h1>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <QRCodeCanvas value={singleBoooking?._id || "N/A"} size={120} />
        </div>

        {/* Booking Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Name", singleBoooking?.userId?.name || "User Name"],
              ["Email", singleBoooking?.userId?.email || "N/A"],
              ["Event", singleBoooking?.eventId?.title || "Event Name"],
              ["Category", singleBoooking?.eventId?.category || "General"],
              ["Date", formattedDate],
              ["Time", `${startTime} - ${endTime}`],
              ["Location", singleBoooking?.eventId?.location || "N/A"],
              ["Quantity", singleBoooking?.quantity || 1],
              [
                "Total Paid",
                `₦${singleBoooking?.totalPrice?.toLocaleString() || 0}`,
              ],
              [
                "Payment Status",
                singleBoooking?.paymentStatus || "Pending",
                singleBoooking?.paymentStatus === "paid"
                  ? "#dcfce7"
                  : "#fee2e2",
                singleBoooking?.paymentStatus === "paid"
                  ? "#166534"
                  : "#991b1b",
              ],
              ["Booking ID", singleBoooking?._id || "N/A"],
            ].map(([label, value, bgColor, textColor], idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "12px 8px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  {label}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    color: textColor || "#111827",
                    backgroundColor: bgColor || "transparent",
                    fontWeight: label === "Total Paid" ? 700 : 400,
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{ marginTop: "24px", textAlign: "center", color: "#6b7280" }}
        >
          Thank you for booking! Please save this confirmation for your records.
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
