import { jsPDF } from "jspdf";
import QRCode from "qrcode";

/**
 * Formats a time string (e.g. "14:30" or ISO date) to "02:30 PM"
 */
const formatTimeStr = (time) => {
  if (!time) return "TBA";
  try {
    if (time.includes(":")) {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    const d = new Date(time);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  } catch {
    // fallback
  }
  return time;
};

/**
 * Formats a date string to "Sat, Nov 14, 2026"
 */
const formatDateStr = (dateVal) => {
  if (!dateVal) return "Date TBA";
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch {
    // fallback
  }
  return String(dateVal);
};

/**
 * Generates and downloads a high-resolution, vector-crisp PDF ticket pass.
 * Pure vector drawing via jsPDF & QRCode.
 * Completely immune to CSS rendering bugs (e.g. Tailwind v4 oklch), works across all modern browsers and devices.
 *
 * @param {Object} params
 * @param {Object} params.booking - The booking document
 * @param {Object} params.event - The event details
 * @param {Object} params.user - The attendee details
 * @returns {Promise<boolean>}
 */
export const generateTicketPDF = async ({ booking, event, user }) => {
  try {
    const bookingId = booking?._id || booking?.BookingId || "AURASPACE-TICKET";
    const refCode = `#${bookingId.slice(-8).toUpperCase()}`;

    // Extract event attributes
    const title = event?.title || "Special Event Pass";
    const category = (event?.category || "EVENT").toUpperCase();
    const formattedDate = formatDateStr(event?.eventDate);
    const startTime = formatTimeStr(event?.startTime);
    const endTime = event?.endTime ? formatTimeStr(event?.endTime) : "";
    const timeDisplay = endTime && endTime !== "TBA" ? `${startTime} - ${endTime}` : startTime;
    const duration = event?.eventDuration ? ` • ${event.eventDuration}` : "";
    const location = event?.location || "Venue location to be announced";

    // Extract attendee attributes
    const attendeeName =
      user?.name ||
      user?.fullName ||
      booking?.userName ||
      booking?.attendeeName ||
      "Valued Attendee";
    const attendeeEmail =
      user?.email ||
      booking?.userEmail ||
      booking?.email ||
      "";

    // Extract booking attributes
    const quantity = booking?.quantity || booking?.ticketsCount || 1;
    const rawPrice = booking?.totalPrice ?? booking?.amount ?? booking?.price ?? 0;
    const priceDisplay =
      Number(rawPrice) > 0 ? `NGN ${Number(rawPrice).toLocaleString()}` : "Free Admission";

    // Initialize A4 document (portrait, mm)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const cardX = 18;
    const cardY = 22;
    const cardW = 174;
    const cardH = 245;

    // 1. Page Background (Warm White / Charcoal ambient)
    doc.setFillColor(247, 246, 242);
    doc.rect(0, 0, 210, 297, "F");

    // 2. Main Ticket Card Container (Midnight Slate #111827)
    doc.setFillColor(17, 24, 39);
    doc.roundedRect(cardX, cardY, cardW, cardH, 7, 7, "F");

    // Subtle Card Border
    doc.setDrawColor(45, 55, 72);
    doc.setLineWidth(0.4);
    doc.roundedRect(cardX, cardY, cardW, cardH, 7, 7, "S");

    // 3. Header Banner (Dark Navy #161F30)
    doc.setFillColor(22, 31, 48);
    doc.roundedRect(cardX, cardY, cardW, 26, 7, 7, "F");
    doc.rect(cardX, cardY + 18, cardW, 8, "F"); // Flatten bottom corners of header

    // Brand Logo: "Aura" (White) + "Space" (Violet #8065E8)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("Aura", cardX + 10, cardY + 13);
    const auraWidth = doc.getTextWidth("Aura");
    doc.setTextColor(128, 101, 232);
    doc.text("Space", cardX + 10 + auraWidth, cardY + 13);

    // Badge: "DIGITAL PASS"
    const badgeX = cardX + 10 + auraWidth + 20;
    doc.setFillColor(128, 101, 232);
    doc.roundedRect(badgeX, cardY + 7.5, 25, 5.5, 1.5, 1.5, "F");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text("DIGITAL PASS", badgeX + 2.5, cardY + 11.3);

    // Reference Code & Status on Right
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(244, 91, 105); // Coral #F45B69
    doc.text(`REF: ${refCode}`, cardX + cardW - 10, cardY + 11, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text("VERIFIED & CONFIRMED", cardX + cardW - 10, cardY + 17, { align: "right" });

    // 4. Event Section
    let currentY = cardY + 36;

    // Category Pill
    doc.setFillColor(31, 41, 55);
    const catWidth = Math.max(doc.getTextWidth(category) + 8, 22);
    doc.roundedRect(cardX + 10, currentY, catWidth, 5.5, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(167, 139, 250);
    doc.text(category, cardX + 14, currentY + 4);

    currentY += 11;

    // Event Title (Auto-wrapped for long titles)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    const titleLines = doc.splitTextToSize(title, cardW - 20);
    doc.text(titleLines, cardX + 10, currentY);
    currentY += titleLines.length * 7 + 5;

    // Date & Time Box (Left block)
    const boxWidth = (cardW - 26) / 2;
    const boxHeight = 27;

    doc.setFillColor(26, 36, 53);
    doc.roundedRect(cardX + 10, currentY, boxWidth, boxHeight, 3.5, 3.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("DATE & TIME", cardX + 15, currentY + 6.5);

    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(formattedDate, cardX + 15, currentY + 13.5);

    doc.setFontSize(8);
    doc.setTextColor(167, 139, 250);
    doc.text(`${timeDisplay}${duration}`, cardX + 15, currentY + 19.5);

    // Venue / Location Box (Right block)
    const venueX = cardX + 10 + boxWidth + 6;
    doc.setFillColor(26, 36, 53);
    doc.roundedRect(venueX, currentY, boxWidth, boxHeight, 3.5, 3.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("VENUE / LOCATION", venueX + 5, currentY + 6.5);

    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    const locLines = doc.splitTextToSize(location, boxWidth - 10);
    doc.text(locLines.slice(0, 2), venueX + 5, currentY + 13);

    currentY += boxHeight + 11;

    // 5. Perforated Tear-off Divider
    // Cutout notch left
    doc.setFillColor(247, 246, 242);
    doc.circle(cardX, currentY, 4, "F");
    // Cutout notch right
    doc.circle(cardX + cardW, currentY, 4, "F");

    // Dashed perforation line
    doc.setDrawColor(75, 85, 99);
    doc.setLineWidth(0.5);
    doc.setLineDashPattern([2.5, 2], 0);
    doc.line(cardX + 7, currentY, cardX + cardW - 7, currentY);
    doc.setLineDashPattern([], 0); // Reset dash

    currentY += 9;

    // 6. Bottom Pass Stub Container
    const stubHeight = cardY + cardH - currentY - 10;
    doc.setFillColor(22, 31, 48);
    doc.roundedRect(cardX + 8, currentY, cardW - 16, stubHeight, 5, 5, "F");

    // Stub Content - Left Column (Attendee details)
    const stubLeftX = cardX + 16;
    let stubY = currentY + 11;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("ATTENDEE NAME", stubLeftX, stubY);

    doc.setFontSize(11.5);
    doc.setTextColor(255, 255, 255);
    const attendeeLines = doc.splitTextToSize(attendeeName, 80);
    doc.text(attendeeLines.slice(0, 1), stubLeftX, stubY + 5.5);

    if (attendeeEmail) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(attendeeEmail, stubLeftX, stubY + 11);
    }

    stubY += 21;

    // Quantity & Total Price blocks
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("QUANTITY", stubLeftX, stubY);
    doc.text("TOTAL AMOUNT", stubLeftX + 38, stubY);

    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`${quantity} ${quantity === 1 ? "Pass" : "Passes"}`, stubLeftX, stubY + 5.5);

    doc.setTextColor(128, 101, 232); // Violet accent
    doc.text(priceDisplay, stubLeftX + 38, stubY + 5.5);

    // Gate entry guidelines
    stubY += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(156, 163, 175);
    doc.text("• Present this QR pass at the gate for electronic check-in", stubLeftX, stubY);
    doc.text("• Each ticket admits one attendee entry according to purchased tier", stubLeftX, stubY + 3.8);
    doc.text("• Duplicate copies or reused passes will be flagged by gate security", stubLeftX, stubY + 7.6);

    // Right Column - Scannable QR Code
    const qrBoxW = 44;
    const qrBoxH = 48;
    const qrBoxX = cardX + cardW - 16 - qrBoxW - 6;
    const qrBoxY = currentY + 8;

    // QR Code White Frame
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 3.5, 3.5, "F");

    // Generate high-resolution QR Code
    const qrDataUrl = await QRCode.toDataURL(bookingId, {
      width: 280,
      margin: 1,
      errorCorrectionLevel: "H",
      color: { dark: "#111827", light: "#FFFFFF" },
    });

    doc.addImage(qrDataUrl, "PNG", qrBoxX + 3, qrBoxY + 3, 38, 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(31, 41, 55);
    doc.text("SCAN FOR ENTRY", qrBoxX + qrBoxW / 2, qrBoxY + 44, { align: "center" });

    // 7. Footer text below card
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 119, 131);
    doc.text(
      "AuraSpace Ticketing Platform • Keep your ticket safe • https://auraspace.app",
      pageWidth / 2,
      282,
      { align: "center" }
    );

    // 8. Trigger Universal Cross-Device Download
    const fileName = `AuraSpace-Ticket-${bookingId.slice(-8)}.pdf`;

    // Method A: Standard Blob object URL with click trigger
    try {
      const blob = doc.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        try {
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobUrl);
        } catch {
          // ignore cleanup errors
        }
      }, 1500);

      return true;
    } catch {
      // Method B: jsPDF native save fallback
      doc.save(fileName);
      return true;
    }
  } catch (error) {
    console.error("generateTicketPDF failed:", error);
    throw error;
  }
};

