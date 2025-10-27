import React, { useCallback, useContext, useEffect } from "react";
import { authContext } from "../../Context/userContext";
import Header from "../../Common/Header";

import "../../userStyles/Dashbaord.css";

import { motion } from "framer-motion";
import HeroSection from "./Components/HeroSection";
import ImageSlider from "./Components/ImageSlider";
import WhatWeOffer from "../../Component/WhatWeOffer";
import Footer from "../../Common/Footer";
const DashbaordPage = () => {
  const { userInfo, displayEvents, showEvents } = useContext(authContext);

  useEffect(() => {
    const displayUserEvnts = async () => {
      try {
        await displayEvents();
      } catch (error) {
        console.log(error);
      }
    };

    displayUserEvnts();
  }, []);
  return (
    <div>
      <Header />
      <h1> Welcome {userInfo.name || "Guest"}</h1>

      {/* <img src={userInfo.profileImage} alt="" width={200} height={200} /> */}

      <HeroSection />

      <ImageSlider />

      <WhatWeOffer />

      <Footer />
    </div>
  );
};

export default DashbaordPage;
