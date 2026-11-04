// Sample "trending worldwide" events matching the AddEventsPage / CreateEvent form fields.
// NOTE: Dates, times, capacities and prices (NGN) are illustrative placeholders,
// not official schedules. Verify before publishing.
// Fields: title, description, category, location, eventDate (YYYY-MM-DD),
// startTime, endTime (HH:mm), eventDuration, TicketsAvailable, price.

export const sampleEvents = [
  // ---------- Music ----------
  {
    title: "Coachella Valley Music and Arts Festival",
    description:
      "One of the world's most-watched festivals: headline pop, hip-hop, rock and electronic acts across multiple stages in the California desert.",
    category: "Music",
    location: "Empire Polo Club, Indio, California, USA",
    eventDate: "2027-04-16",
    startTime: "12:00",
    endTime: "23:59",
    eventDuration: "3 Days",
    TicketsAvailable: "500",
    price: "450000",
  },
  {
    title: "Afro Nation Portugal",
    description:
      "The biggest Afrobeats and Amapiano festival outside Africa, bringing global stars and the diaspora together on the Portuguese coast.",
    category: "Music",
    location: "Praia da Rocha, Portimão, Portugal",
    eventDate: "2027-07-01",
    startTime: "14:00",
    endTime: "23:59",
    eventDuration: "3 Days",
    TicketsAvailable: "400",
    price: "380000",
  },

  // ---------- Technology ----------
  {
    title: "Web Summit Lisbon",
    description:
      "Global tech conference covering AI, startups, fintech and climate tech, with founders, investors and Fortune 500 leaders.",
    category: "Technology",
    location: "Altice Arena, Lisbon, Portugal",
    eventDate: "2027-11-02",
    startTime: "09:00",
    endTime: "18:00",
    eventDuration: "4 Days",
    TicketsAvailable: "1000",
    price: "300000",
  },
  {
    title: "CES Las Vegas",
    description:
      "The world's largest consumer technology showcase: AI devices, robotics, mobility and next-generation gadgets.",
    category: "Technology",
    location: "Las Vegas Convention Center, Nevada, USA",
    eventDate: "2027-01-05",
    startTime: "09:00",
    endTime: "18:00",
    eventDuration: "4 Days",
    TicketsAvailable: "800",
    price: "280000",
  },

  // ---------- Business ----------
  {
    title: "World Economic Forum Annual Meeting",
    description:
      "Heads of state, CEOs and economists discuss global economic outlook, trade, technology governance and sustainability.",
    category: "Business",
    location: "Davos Congress Centre, Davos, Switzerland",
    eventDate: "2027-01-18",
    startTime: "09:00",
    endTime: "19:00",
    eventDuration: "5 Days",
    TicketsAvailable: "300",
    price: "750000",
  },
  {
    title: "Africa Fintech Summit",
    description:
      "Investors, banks and fintech founders explore payments, digital banking and cross-border finance across Africa.",
    category: "Business",
    location: "Eko Convention Centre, Lagos, Nigeria",
    eventDate: "2027-03-10",
    startTime: "09:00",
    endTime: "17:00",
    eventDuration: "2 Days",
    TicketsAvailable: "600",
    price: "75000",
  },

  // ---------- Education ----------
  {
    title: "SXSW EDU",
    description:
      "Educators, policymakers and edtech innovators share ideas on the future of learning, AI in classrooms and skills training.",
    category: "Education",
    location: "Austin Convention Center, Texas, USA",
    eventDate: "2027-03-08",
    startTime: "09:00",
    endTime: "17:30",
    eventDuration: "4 Days",
    TicketsAvailable: "500",
    price: "220000",
  },
  {
    title: "Global Student Leadership and Scholarship Fair",
    description:
      "Meet admissions officers from leading universities, learn about scholarships and attend career workshops.",
    category: "Education",
    location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    eventDate: "2027-02-20",
    startTime: "10:00",
    endTime: "16:00",
    eventDuration: "6 Hours",
    TicketsAvailable: "1000",
    price: "0",
  },

  // ---------- Sports ----------
  {
    title: "FIFA World Cup 2026 Legacy Fan Festival",
    description:
      "Fan zone with live screenings, football legends, skills challenges and food stalls celebrating the world's biggest sport.",
    category: "Sports",
    location: "Teslim Balogun Stadium, Surulere, Lagos, Nigeria",
    eventDate: "2027-06-12",
    startTime: "14:00",
    endTime: "22:00",
    eventDuration: "8 Hours",
    TicketsAvailable: "5000",
    price: "10000",
  },
  {
    title: "Lagos City Marathon",
    description:
      "Full marathon, half marathon and 10km fun run through the heart of Lagos, with international elite runners.",
    category: "Sports",
    location: "National Stadium, Surulere, Lagos, Nigeria",
    eventDate: "2027-02-13",
    startTime: "05:30",
    endTime: "12:00",
    eventDuration: "6 Hours",
    TicketsAvailable: "3000",
    price: "15000",
  },

  // ---------- Entertainment ----------
  {
    title: "Comic-Con International Fan Weekend",
    description:
      "Film, TV, gaming and comics premieres with celebrity panels, cosplay contests and exclusive merchandise.",
    category: "Entertainment",
    location: "San Diego Convention Center, California, USA",
    eventDate: "2027-07-22",
    startTime: "10:00",
    endTime: "20:00",
    eventDuration: "4 Days",
    TicketsAvailable: "700",
    price: "260000",
  },
  {
    title: "Africa Magic Film and Comedy Night",
    description:
      "Screenings of new Nollywood releases followed by a live stand-up comedy showcase with top African comedians.",
    category: "Entertainment",
    location: "Muson Centre, Onikan, Lagos, Nigeria",
    eventDate: "2027-04-03",
    startTime: "17:00",
    endTime: "23:00",
    eventDuration: "6 Hours",
    TicketsAvailable: "800",
    price: "25000",
  },

  // ---------- Lifestyle ----------
  {
    title: "Milan Fashion Week",
    description:
      "Runway shows from leading luxury houses and emerging designers, plus street-style and industry networking events.",
    category: "Lifestyle",
    location: "Fiera Milano, Milan, Italy",
    eventDate: "2027-02-23",
    startTime: "10:00",
    endTime: "21:00",
    eventDuration: "6 Days",
    TicketsAvailable: "250",
    price: "500000",
  },
  {
    title: "Lagos Food and Wellness Festival",
    description:
      "Street food, healthy-living workshops, yoga sessions and live cooking demos from top chefs and wellness coaches.",
    category: "Lifestyle",
    location: "Tafawa Balewa Square, Lagos Island, Lagos, Nigeria",
    eventDate: "2027-05-15",
    startTime: "11:00",
    endTime: "20:00",
    eventDuration: "9 Hours",
    TicketsAvailable: "2000",
    price: "8000",
  },

  // ---------- Arts ----------
  {
    title: "Art Basel Miami Beach",
    description:
      "Premier contemporary art fair featuring galleries from around the world, installations and curated public art.",
    category: "Arts",
    location: "Miami Beach Convention Center, Florida, USA",
    eventDate: "2027-12-02",
    startTime: "11:00",
    endTime: "19:00",
    eventDuration: "4 Days",
    TicketsAvailable: "400",
    price: "200000",
  },
  {
    title: "ART X Lagos",
    description:
      "West Africa's leading international art fair showcasing contemporary African artists, talks and live performances.",
    category: "Arts",
    location: "Federal Palace Hotel, Victoria Island, Lagos, Nigeria",
    eventDate: "2027-11-05",
    startTime: "11:00",
    endTime: "19:00",
    eventDuration: "3 Days",
    TicketsAvailable: "600",
    price: "20000",
  },
];

export default sampleEvents;

