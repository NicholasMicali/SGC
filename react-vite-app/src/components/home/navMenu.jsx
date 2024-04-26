import React from "react";
import { useNavigate } from 'react-router-dom';
import FeedIcon from "../../assets/FeedIcon.svg";
import InspirationIcon from "../../assets/InspirationIcon.svg"; 
import JournalIcon from "../../assets/JournalIcon.svg"; 
import AccountSettingsIcon from "../../assets/AccountSettingsIcon.svg"
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
          <div>
            FAQ
          </div>
          <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
            Give us Feedback
          </div>

        </div>
      </>
    );
};

export default NavMenu;