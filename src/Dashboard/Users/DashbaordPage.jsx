import React, { useContext, useEffect } from "react";
import { authContext } from "../../Context/userContext";
import Header from "../../Common/Header";
import HeroSection from "./Components/HeroSection";
import ImageSlider from "./Components/ImageSlider";
import WhatWeOffer from "../../Component/WhatWeOffer";
import Footer from "../../Common/Footer";

const DashbaordPage = () => {
  const { displayEvents } = useContext(authContext);

  useEffect(() => {
    displayEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ImageSlider />
        <WhatWeOffer />
      </main>
      <Footer />
    </div>
  );
};

export default DashbaordPage;
