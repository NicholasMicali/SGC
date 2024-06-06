import React from "react";
import {motion} from "framer-motion";
import { animateSideFadeIn } from "../../constants/anim";

const NavItem = ({icon, text, page, onClick, index}) => {
    return(<motion.div className="flex flex-row justify-center items-center" {...animateSideFadeIn(true, index * 0.1)}>
    <img className={page === text ? "mr-2 text-pink-500" : 'mr-2'} src={icon} alt="Feed Icon" />
    <button onClick={onClick} className={page === text ? "font-extrabold text-pink-500" : ''}>
      {text == "Feed" ? "Home" : text}
    </button>
  </motion.div>)
}

export default NavItem;