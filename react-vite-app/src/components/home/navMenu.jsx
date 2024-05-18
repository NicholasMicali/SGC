import React from "react";
import { useNavigate } from 'react-router-dom';
import FeedIcon from "../../assets/FeedIcon.svg";
import InspirationIcon from "../../assets/InspirationIcon.svg"; 
import JournalIcon from "../../assets/JournalIcon.svg"; 
import AccountSettingsIcon from "../../assets/AccountSettingsIcon.svg"
import TwitterIcon from "../../assets/TwitterIcon.svg"
import YoutubeIcon from "../../assets/YoutubeIcon.svg"
import InstagramIcon from "../../assets/InstagramIcon.svg"
import FacebookIcon from "../../assets/FacebookIcon.svg"
import classroomIcon from "../../assets/classroom.svg"
import NavItem from "./navItem";

const NavMenu = ({page}) => {

  const navigate = useNavigate();  // Hook for navigation

    const onClick = (path) => {
        navigate(path);  // Navigates to the given path
    };

    return (
      <>
        <div className="flex flex-col w-full items-start p-2 mxy-8 gap-4">
          <NavItem icon={FeedIcon} text="Feed" page={page} onClick={() => onClick('/home')}/>
          <NavItem icon={InspirationIcon} text="Inspiration" page={page} onClick={() => onClick('/inspiration')}/>
          <NavItem icon={JournalIcon} text="Journal" page={page} onClick={() => onClick('/journal')}/>
          <NavItem icon={AccountSettingsIcon} text="Account Settings" page={page} onClick={() => onClick('/account')}/>
          <NavItem icon={classroomIcon} text="Classroom" page={page} onClick={() => onClick('/classroom')}/>
          <div className="mt-8 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
            Give us Feedback
          </div>
          <div className="inline-block bg-clip-text">
            Follow us on:
          </div>
          <div className="flex flex-row w-full space-x-4 items-center">
          <a href="" target="_blank" rel="noopener noreferrer">
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
      </>
    );
};

export default NavMenu;