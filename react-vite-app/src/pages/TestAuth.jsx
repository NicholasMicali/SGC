import React from "react";
import megaphoneIcon from "/auth/megaphone.svg";
import heartIcon from "/auth/heart.svg";
import { motion } from "framer-motion";
import { animateMegaphoneHeart } from "../constants/anim";

const hearts = [
  { x: 0, y: -30, scale: 1.8 },
  { x: 10, y: 20, scale: 1.1 },
  { x: 35, y: 70, scale: 1.5 },

  {x: 50, y: -50, scale: 1.3},
  { x: 55, y: 0, scale: 1.2 },
  { x: 60, y: 35, scale: 2.1 },

  {x: 90, y: -30, scale: 1.4},
  {x: 100, y: 10, scale: 1.2},
  {x: 100, y: 50, scale: 1.5},
];

const TestAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <img src={megaphoneIcon} alt="megaphone" />
        {hearts.map((heart, index) => (
          <motion.img
            key={index}
            {...animateMegaphoneHeart(heart.x, heart.y, heart.scale)}
            src={heartIcon}
            alt="heart"
            className="absolute top-0 right-0 w-6 h-6"
          />
        ))}
      </div>
    </div>
  );
};

export default TestAuth;
