import React from "react";
import { useNavigate } from 'react-router-dom';
import FeedIcon from "../../assets/FeedIcon.svg";
import InspirationIcon from "../../assets/InspirationIcon.svg"; 
import JournalIcon from "../../assets/JournalIcon.svg"; 
import AccountSettingsIcon from "../../assets/AccountSettingsIcon.svg"
const NavMenu = ({page}) => {

  const navigate = useNavigate();  // Hook for navigation

    const onClick = (path) => {
        navigate(path);  // Navigates to the given path
    };

    return (
      <>
        <div className="flex flex-col items-start p-2 mxy-8 gap-4">
          <div className="flex flex-row justify-center items-center">
            <div className={page === "home" ? "mr-2 text-pink-500" : 'mr-2'}>
            <img src={FeedIcon} alt="Feed Icon" />
            </div>
            <button onClick={() => onClick('/home')} className={page === "home" ? "font-extrabold text-pink-500" : ''}>
              Home
            </button>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className={page === "inspiration" ? "mr-2 text-pink-500" : 'mr-2'}>
            <img src={InspirationIcon} alt="Inspiration Icon" />
            </div>
            <button onClick={() => onClick('/inspiration')} className={page === "inspiration" ? "font-extrabold text-pink-500" : ''}>
              Inspiration
            </button>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className={page === "journal" ? "mr-2 text-pink-500" : 'mr-2'}>
            <img src={JournalIcon} alt="Journal Icon" />
            </div>
            <button onClick={() => onClick('/journal')} className={page === "journal" ? "font-extrabold text-pink-500" : ''}>
              Journal
            </button>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className={page === "account" ? "mr-2 text-pink-500" : 'mr-2'}>
            <img src={AccountSettingsIcon} alt="Account Settings Icon" />
            </div>
            <button onClick={() => onClick('/account')} className={page === "account" ? "font-extrabold text-pink-500" : ''}>
              Account Settings
            </button>
          </div>
          <div className="font-semibold">
            Give us Feedback
          </div>
        </div>
      </>
    );
};

export default NavMenu;