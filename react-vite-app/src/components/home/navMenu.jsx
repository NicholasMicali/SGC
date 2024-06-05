import React from "react";
import { useNavigate } from "react-router-dom";
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

import NavItem from "./navItem";

const NavMenu = ({ page, setPage }) => {
  const navigate = useNavigate(); // Hook for navigation

  const onClick = (path) => {
    setPage(path[1]); // Sets the page state to the path
    navigate(path[0]); // Navigates to the given path
  };

  return (
    <>
      <div className="flex flex-col w-full items-start p-2 mxy-8 gap-4">
        <NavItem
          icon={page === "Feed" ? FeedIcon : HomeBlack}
          text="Feed"
          page={page}
          onClick={() => onClick(["/home", "Feed"])}
        />
        <NavItem
          icon={page === "Inspiration" ? inspirationPink : InspirationIcon}
          text="Inspiration"
          page={page}
          onClick={() => onClick(["/inspiration", "Inspiration"])}
        />
        <NavItem
          icon={page === "Journal" ? journalPink : JournalIcon}
          text="Journal"
          page={page}
          onClick={() => onClick(["/journal", "Journal"])}
        />
        <NavItem
          icon={page === "Account Settings" ? accountPink : AccountSettingsIcon}
          text="Account Settings"
          page={page}
          onClick={() => onClick(["/account", "Account Settings"])}
        />
        <NavItem
          icon={page === "Classroom" ? classroomPink : classroomIcon}
          text="Classroom"
          page={page}
          onClick={() => onClick(["/classroom", "Classroom"])}
        />
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSew72rWdPKoISCttPq9xHj05BxyJpI4jv57i0jZrW4K2-rSMg/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
          <div className="mt-8 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end inline-block text-transparent bg-clip-text cursor-pointer">
            Give us Feedback
          </div>
        </a>
        <div className="inline-block bg-clip-text">Follow us on:</div>
        <div className="flex flex-row w-full space-x-4 items-center">
          <a href="https://twitter.com/goodnessdotlove" target="_blank" rel="noopener noreferrer">
            <img
              src={TwitterIcon}
              alt="Twitter Icon"
              className="cursor-pointer hover:fill-pink-500"
            />
          </a>
          <a href="https://www.youtube.com/@spreadgoodnesstv" target="_blank" rel="noopener noreferrer">
            <img
              src={YoutubeIcon}
              alt="Youtube Icon"
              className="cursor-pointer"
            />
          </a>
          <a href="https://www.instagram.com/spreadgoodnesstv?igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
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
