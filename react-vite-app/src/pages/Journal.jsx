import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/index";
import { doSignOut } from "../firebase/auth.js";
import { Navigate } from "react-router-dom";
import { LeftSidebar } from "../components/home/leftSideBar";
import PromptList from "../components/journal/PromptList";
import SmallMenuSidebar from "../components/home/smallMenuSidebar";

const JournalPage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth <= 768
  );

  const promptsArr = {
    vibesUp: {
      className: "bg-[#ffe9f2] border-[#fc086b]",
      buttonClassName: "text-[#fc086b]",
      title: "Vibes Up",
      titleClassName: "text-[#fc086b]",
    },
    upLift: {
      className: "bg-idle-blue border-[#1c9cd4]",
      buttonClassName: "text-[#1c9cd4]",
      title: "Up Lift",
      titleClassName: "text-[#1c9cd4]",
    },
    heartsOpen: {
      className: "bg-[#e0f0a4] border-[#92b024]",
      buttonClassName: "text-[#92b024]",
      title: "Hearts Open",
      titleClassName: "text-[#92b024]",
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const user = await doSignOut();
    } catch (error) {
      // Handle errors here, such as displaying a message to the user
      console.error("Log out failed:", error);
      alert("Failed to log out: " + error.message);
      return;
    }
    //console.log("user logged out: " + user);
    setIsSigningOut(true);
  };

  if (isSigningOut) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="flex h-screen">
      {!isNarrowScreen && (
        <LeftSidebar user={currentUser} signOut={signOut} page="Journal" />
      )}
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <div className="self-start text-[4rem] font-bold">Journal Prompt</div>
        <hr className="w-full border-t-2 border-idle-pink my-4" />

        <div className="flex w-full h-full justify-between">
          {currentUser && Object.keys(promptsArr).map((key, index) => {
            return (
              <PromptList
                key={key}
                className={promptsArr[key].className}
                buttonClassName={promptsArr[key].buttonClassName}
                title={promptsArr[key].title}
                titleClassName={promptsArr[key].titleClassName}
                staggerIndex={index}
              />
            );
          })}
        </div>
      </div>
      {isNarrowScreen && (
        <SmallMenuSidebar user={currentUser} signOut={signOut} page="Journal" />
      )}
    </div>
  );
};

export default JournalPage;
