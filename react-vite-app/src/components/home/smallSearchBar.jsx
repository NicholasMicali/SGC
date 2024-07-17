import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBackground from "../../assets/searchBackground.svg";
import SearchBackground2 from "../../assets/searchBackground2.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import SearchXIcon from "../../assets/SearchXIcon.svg";
import SearchBar from "./searchbar.jsx";
import { motion } from "framer-motion";

const variants = {
  open: { x: 0, opacity: 1, scale: 1 },
  closed: { x: "-100%", opacity: 0, scale: 0 },
};

const transition = { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] };

const SmallSearchBar = ({ user, signOut, page, onSearch, setPage }) => {
  const [isSmallSearch, setSmallSearch] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const onClick = (path) => {
    navigate(path); // Navigates to the given path
  };

  return (
    <div className="w-screen fixed bottom-0 z-30">
      {isSmallSearch ? (
        <motion.div
          variants={variants}
          // initial="closed"
          // animate={isSmallSearch ? "open" : "closed"}
          transition={transition}
          layoutId="search"
        >
          <img
            src={SearchBackground2}
            alt="Search background 2"
            className="w-screen"
          />
          <img
            src={SearchXIcon}
            alt="Search Icon"
            className="absolute bottom-0 left-0 w-31 h-17 z-30 p-1 cursor-pointer"
            onClick={() => setSmallSearch(!isSmallSearch)}
          />
          <div className="absolute bottom-0 left-20 z-20 w-3/4">
            <SearchBar onSearch={onSearch} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={variants}
          // initial="open"
          // animate={isSmallSearch ? "closed" : "open"}
          transition={transition}
          className="absolute bottom-0 left-0"
          layoutId="search"
        >
          <img
            src={SearchBackground}
            alt="Search background"
            className="w-203 h-151 z-20"
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="absolute bottom-0 left-0 w-31 h-17 z-30 p-1 cursor-pointer"
            onClick={() => setSmallSearch(!isSmallSearch)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default SmallSearchBar;
