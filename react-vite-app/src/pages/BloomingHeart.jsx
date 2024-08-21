import React from "react";
import heart from "/auth/blooming_heart.svg";
import logo from "/SGC_LOGO.svg";
import { motion } from "framer-motion";

const BloomingHeart = () => {
  const num_of_lines = 10;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative z-10">
        <img src={heart} alt="blooming heart" />
        <img
          src={logo}
          alt="logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 "
        />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-full h-2" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-2 h-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 w-2 h-screen rotate-45" />


    </div>
  );
};

export default BloomingHeart;