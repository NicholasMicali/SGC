import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../../assets/MenuIcon.svg";
import { LogOut } from "lucide-react";
import MenuXIcon from "../../assets/MenuXIcon.svg";
import NavItem from "./navItem";
import MenuBackgroundPNG from "../../assets/MenuBackground.png";
import { navItemArr, mediaArr } from "../../constants/pageConstants";
import { motion } from "framer-motion";
import { animateVerticalFadeIn, animateSideFadeIn } from "../../constants/anim";
import { doFetchUserProfile} from "../../firebase/firestore";

const SmallMenuSidebar = ({ user, signOut, page, setPage }) => {
  const [isSmallMenu, setSmallMenu] = useState(false);

  const sidebarRef = useRef(null); // Step 1: Create a ref for the sidebar

  const navigate = useNavigate(); // Hook for navigation

  const onClick = (path) => {
    navigate(path); // Navigates to the given path
  };

  //basically allows user to click outside of sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSmallMenu && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSmallMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSmallMenu]); 

  return (
    <>
      {!isSmallMenu && (
        <div className="md:hidden">
          <img
            src={MenuBackgroundPNG}
            alt="Menu Background"
            className="absolute top-0 right-0 w-203 h-151 z-20"
          />
          <button
            className="z-30 p-1 absolute top-6 right-8 mt-2 ml-3"
            onClick={() => setSmallMenu(!isSmallMenu)}
          >
            <img src={MenuIcon} alt="Menu Icon" className="w-31 h-17 w-8 h-8" />
          </button>
        </div>
      )}

      {isSmallMenu && (
        <div ref={sidebarRef} className="fixed top-0 right-0 w-64 h-full bg-white z-40 shadow-lg p-4">
          <button
            className="z-30 p-1 absolute top-2 right-1"
            onClick={() => setSmallMenu(!isSmallMenu)}
          >
            <img src={MenuXIcon} alt="Menu X" className="w-31 h-17 w-8 h-8" />
          </button>
          <div className="relative flex flex-col w-full items-start p-2 mxy-8 gap-2 z-10">
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
            <div className="w-full h-[1px] bg-gray-300"></div>
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSew72rWdPKoISCttPq9xHj05BxyJpI4jv57i0jZrW4K2-rSMg/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              {...animateSideFadeIn(true, 0.1)}
            >
              <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
                Give us Feedback
              </div>
            </motion.a>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="flex flex-col justify-end h-full w-full">
              <button
                className=" flex items-center self-start m-1 font-bold gap-2"
                onClick={signOut}
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="fixed bottom-0 right-0 z-50 flex items-center justify-between p-4">
              <motion.div {...animateVerticalFadeIn(0.2)} className="mr-5">
                Follow us on
              </motion.div>
              <div className="flex flex-row items-center space-x-3">
                {mediaArr.map((item, index) => {
                  return (
                    <motion.a
                      key={index}
                      href={item[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...animateVerticalFadeIn(0.1 + index * 0.1)}
                    >
                      <img
                        src={item[1]}
                        alt={item[2]}
                        className="cursor-pointer"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallMenuSidebar;
