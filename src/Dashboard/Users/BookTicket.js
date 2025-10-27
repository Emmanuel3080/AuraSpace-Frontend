export const BookTicket = async (eventId, quantity) => {
  try {
    const response = await fetch(`http://localhost:4500/user/book/ticket`, {
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
