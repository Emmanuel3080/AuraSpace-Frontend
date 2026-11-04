const baseUrl = import.meta.env.VITE_API_URL || "https://auraspace-backend.onrender.com";

export const BookTicket = async (eventId, quantity) => {
  try {
    const response = await fetch(`${baseUrl}/user/book/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
      body: JSON.stringify({ eventId, quantity }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("BookTicket network error:", error);
    return { success: false, Status: "Error", Message: "Network connection error. Please try again." };
  }
};
