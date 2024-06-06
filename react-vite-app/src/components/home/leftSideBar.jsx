import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import NavMenu from "./navMenu";
import ProfilePic from "./profilePic";
import { doFetchUserProfile } from "../../firebase/firestore";
import { LogOut } from "lucide-react";
import {motion} from "framer-motion";
import { animateSideFadeIn, animateVerticalFadeIn } from "../../constants/anim";




const LeftSidebar = ({ user, signOut, page, back, setPage }) => {
  const [userData, setUserData] = useState(null);

  const subPagesChangeIcon = ["all", "new", "recieve", "challenge"];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserData(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (userData == null) {
    return <>Not Signed In...</>;
  }

  return (
    userData && (
      <div
        className={`w-64 h-full bg-light-pink overflow-auto p-4 flex flex-col items-center max-md:hidden`}
      >
        <>
          <motion.img src={Logo} alt="Spread Goodness logo" className="p-4 mb-4" {...animateVerticalFadeIn(0, false)} />
          <div className="flex flex-row mb-8 justify-center items-center">
            {userData.image ? (
              <img
                src={userData.image}
                alt=""
                className="w-12 h-12 rounded-full mr-2"
              />
            ) : (
              <ProfilePic username={userData.firstName} />
            )}
            <motion.div {...animateSideFadeIn(false)}>{userData.firstName + " " + userData.lastName}</motion.div>
          </div>
          <NavMenu page={page} setPage={setPage} />
          <div className="flex flex-col justify-end h-full w-full">
            <button className=" flex items-center self-start m-4 font-bold gap-2" onClick={signOut}>
                <LogOut size={24} />
                Sign Out
            </button>
          </div>
        </>
      </div>
    )
  );
};

export { LeftSidebar, ProfilePic };
