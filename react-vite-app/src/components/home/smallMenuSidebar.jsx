import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MenuBackground from "../../assets/MenuBackground.svg";
import MenuIcon from "../../assets/MenuIcon.svg";
import HomeBlack from "../../assets/HomeBlack.svg";
import FeedIcon from "../../assets/FeedIcon.svg";
import InspirationIcon from "../../assets/InspirationIcon.svg"; 
import inspirationPink from "../../assets/inspirationPink.svg";
import JournalIcon from "../../assets/JournalIcon.svg"; 
import journalPink from "../../assets/journalPink.svg";
import AccountSettingsIcon from "../../assets/AccountSettingsIcon.svg";
import accountPink from "../../assets/accountPink.svg";
import classroomIcon from "../../assets/classroom.svg";
import classroomPink from "../../assets/classroomPink.svg";
import TwitterIcon from "../../assets/TwitterIcon.svg";
import YoutubeIcon from "../../assets/YoutubeIcon.svg";
import InstagramIcon from "../../assets/InstagramIcon.svg";
import FacebookIcon from "../../assets/FacebookIcon.svg";
import SignoutIcon from "../../assets/SignoutIcon.svg";
import MenuXIcon from "../../assets/MenuXIcon.svg";

import NavItem from "./navItem";

const SmallMenuSidebar = ({ user, signOut, page }) => {
  const [isSmallMenu, setSmallMenu] = useState(false);

  const navigate = useNavigate();  // Hook for navigation

  const onClick = (path) => {
      navigate(path);  // Navigates to the given path
  };
  
  return (
    <>
      {!isSmallMenu && (
        <>
        <img
          src={MenuBackground}
          alt="Menu Background"
          className="absolute top-0 right-0 w-203 h-151 z-20"
        />
        <button
        className="z-30 p-1 absolute top-6 right-8 mt-2 ml-3"
        onClick={() => setSmallMenu(!isSmallMenu)}
      >
        <img 
          src={MenuIcon} 
          alt="Menu Icon" 
          className="w-31 h-17 w-8 h-8"
        />
      </button>
      </>
      )}
      

      {isSmallMenu && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white z-40 shadow-lg p-4">
          <button
        className="z-30 p-1 absolute top-0 right-0"
        onClick={() => setSmallMenu(!isSmallMenu)}
      >
        <img 
          src={MenuXIcon} 
          alt="Menu Icon" 
          className="w-31 h-17 w-8 h-8"
        />
      </button>
        <div className="relative flex flex-col w-full items-start p-2 mxy-8 gap-2 z-10">
          <NavItem icon={page === "Feed" ? FeedIcon : HomeBlack} text="Feed" page={page} onClick={() => onClick('/home')}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavItem icon={page === "Inspiration" ? inspirationPink : InspirationIcon} text="Inspiration" page={page} onClick={() => onClick('/inspiration')}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavItem icon={page === "Journal" ? journalPink : JournalIcon} text="Journal" page={page} onClick={() => onClick('/journal')}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavItem icon={page === "Account Settings" ? accountPink : AccountSettingsIcon} text="Account Settings" page={page} onClick={() => onClick('/account')}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavItem icon={page === "Classroom" ? classroomPink : classroomIcon} text="Classroom" page={page} onClick={() => onClick('/classroom')}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
            Give us Feedback
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavItem icon={SignoutIcon} text="Sign Out" page={page} onClick={signOut}/>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="fixed bottom-0 right-0 z-50 flex items-center justify-between p-4">
              <div className="mr-5">
                Follow us on
              </div>
              <div className="flex flex-row items-center space-x-3">
                <a href="" target="_blank" rel="noopener noreferrer" className="ml-2">
                  <img
                    src={TwitterIcon}
                    alt="Twitter Icon"
                    className="cursor-pointer hover:fill-pink-500"
                  />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img
                    src={YoutubeIcon}
                    alt="Youtube Icon"
                    className="cursor-pointer"
                  />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img
                    src={InstagramIcon}
                    alt="Instagram Icon"
                    className="cursor-pointer"
                  />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img
                    src={FacebookIcon}
                    alt="Facebook Icon"
                    className="cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallMenuSidebar;