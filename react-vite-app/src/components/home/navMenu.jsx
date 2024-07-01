import React from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./navItem";
import { navItemArr, mediaArr } from "../../constants/pageConstants";
import { motion } from "framer-motion";
import { animateVerticalFadeIn } from "../../constants/anim";


const NavMenu = ({user}) => {
  const navigate = useNavigate(); // Hook for navigation

  const onClick = (path) => {
    navigate(path); // Navigates to the given path
  };

  return (
    <>
      <div className="flex flex-col w-full items-start p-2 mxy-8 gap-4">
        {navItemArr.map((item, index) => {
          if (user.userType === "Visitor" && index === 4) return;
          return (
            <NavItem
              path={item[0]}
              key={index}
              unselectedIcon={item[3]}
              selectedIcon={item[2]}
              text={item[1]}
              onClick={() => onClick(item[0])}
              index={index}
            />
          );
        })}
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSew72rWdPKoISCttPq9xHj05BxyJpI4jv57i0jZrW4K2-rSMg/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          {...animateVerticalFadeIn(0)}
        >
          <div className="mt-8 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
            Give us Feedback
          </div>
        </motion.a>

        <motion.div
          {...animateVerticalFadeIn(0.2)}
          className="inline-block bg-clip-text"
        >
          Follow us on:
        </motion.div>
        <div className="flex flex-row w-full space-x-4 items-center">
          {mediaArr.map((item, index) => {
            return(<motion.a
              key={index}
              href={item[0]}
              target="_blank"
              rel="noopener noreferrer"
              {...animateVerticalFadeIn( 0.1 + (index * 0.1))}
            >
              <img src={item[1]} alt={item[2]} className="cursor-pointer" />
            </motion.a>)
            
          })}
        </div>
      </div>
    </>
  );
};

export default NavMenu;
