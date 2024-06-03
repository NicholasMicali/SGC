import React from "react";
import { motion } from "framer-motion";

const GoogleButton = ({ text, onClick, icon }) => {
  return (
    <motion.button
      className="w-full rounded-lg p-1 flex justify-center gap-4 items-center border-[2px] md:h-[50px] md:mb-8"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <img src={icon} height={25} width={25} />
      <p className=" text-sm">{text}</p>
    </motion.button>
  );
};

export default GoogleButton;
