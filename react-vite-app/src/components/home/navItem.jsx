import React from "react";
import { motion } from "framer-motion";
import { animateSideFadeIn } from "../../constants/anim";
import { useLocation } from "react-router-dom";

const NavItem = ({ unselectedIcon, selectedIcon, text, onClick, index, path }) => {
  const isSelected = useLocation().pathname === path;

  return (
    <motion.div
      className="flex flex-row justify-center items-center"
      {...animateSideFadeIn(true, index * 0.1)}
    >
      <img
        className={isSelected ? "mr-2 text-pink-500" : "mr-2"}
        src={isSelected ? selectedIcon : unselectedIcon}
        alt="Feed Icon"
      />
      <button
        onClick={onClick}
        className={isSelected ? "font-extrabold text-pink-500" : ""}
      >
        {text == "Feed" ? "Home" : text}
      </button>
    </motion.div>
  );
};

export default NavItem;
