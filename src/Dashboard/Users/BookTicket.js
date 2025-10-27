export const BookTicket = async (eventId, quantity) => {
  try {
    const response = await fetch(`https://auraspace-backend.onrender.com/user/book/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
      body: JSON.stringify({ eventId, quantity }),
    });

    const data = await response.json();
    console.log(data);
    
    return data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
