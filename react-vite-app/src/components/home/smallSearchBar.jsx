import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBackground from "../../assets/searchBackground.svg";
import SearchBackground2 from "../../assets/searchBackground2.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import SearchXIcon from "../../assets/SearchXIcon.svg";
import SearchBar from "./searchbar.jsx";
import { motion } from "framer-motion";

const variants = {
  open: { x: 0,  opacity: 1, scale: 1, },
  closed: { x: "-100%",  opacity: 0, scale: 0 },
};

const transition = { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] };

const SmallSearchBar = ({ user, signOut, page, onSearch, setPage }) => {
  const [isSmallSearch, setSmallSearch] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const onClick = (path) => {
    navigate(path); // Navigates to the given path
  };

  return (
    // <>
    //   {!isSmallSearch ? (
    //   <img
    //     src={SearchBackground}
    //     alt="Search Background"
    //     className="absolute bottom-0 left-0 w-203 h-151 z-20"
    //   />
    // ) : (
    //   <motion.div
    //     variants={variants}
    //     initial="closed"
    //     animate={isSmallSearch ? "open" : "closed"}
    //     transition={{duration: 0.5}}
    //   >
    //     <img
    //       src={SearchBackground2}
    //       alt="Search Background2"
    //       className="absolute bottom-0 left-0 w-full h-auto z-20"
    //     />
    //     <div className="absolute bottom-0 left-20 z-20 w-3/4">
    //       <SearchBar onSearch={onSearch}/>
    //     </div>
    //   </motion.div>
    // )}
    //   <button
    //     className={`z-30 p-1 ${isSmallSearch ? 'absolute bottom-0 left-0' : 'absolute bottom-0 left-0'}`}
    //     onClick={() => setSmallSearch(!isSmallSearch)}
    //   >
    //     <img
    //       src={isSmallSearch ? SearchXIcon : SearchIcon}
    //       alt="SearchBar Icon"
    //       className={`w-31 h-17 ${isSmallSearch ? 'w-8 h-8' : ''}`}
    //     />
    //   </button>
    // </>
    <div className="w-screen absolute bottom-0">
      <motion.div
        variants={variants}
        initial="closed"
        animate={isSmallSearch ? "open" : "closed"}
        transition={transition}
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
      <motion.div
        variants={variants}
        initial="open"
        animate={isSmallSearch ? "closed" : "open"}
        transition={transition}
        className="absolute bottom-0 left-0"
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
    </div>
  );
};

export default SmallSearchBar;
