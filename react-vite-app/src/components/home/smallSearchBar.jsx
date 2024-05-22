import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBackground from "../../assets/searchBackground.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import SignoutIcon from "../../assets/SignoutIcon.svg";
import SearchXIcon from "../../assets/MenuXIcon.svg";

import NavItem from "./navItem";

const SmallSearchBar = ({ user, signOut, page }) => {
  const [isSmallSearch, setSmallSearch] = useState(false);

  const navigate = useNavigate();  // Hook for navigation

  const onClick = (path) => {
      navigate(path);  // Navigates to the given path
  };
  
  return (
    <>
      {!isSmallSearch && (
        <img
          src={SearchBackground}
          alt="Search Background"
          className="absolute bottom-0 left-0 w-203 h-151 z-20"
        />
      )}
      <button
        className={`z-30 p-1 ${isSmallSearch ? 'absolute bottom-0 left-0' : 'absolute bottom-0 left-0'}`}
        onClick={() => setSmallSearch(!isSmallSearch)}
      >
        <img 
          src={isSmallSearch ? SearchXIcon : SearchIcon} 
          alt="SearchBar Icon" 
          className={`w-31 h-17 ${isSmallSearch ? 'w-8 h-8' : ''}`} 
        />
      </button>
    </>
  );
};

export default SmallSearchBar;