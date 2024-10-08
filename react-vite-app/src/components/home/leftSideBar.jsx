import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import NavMenu from "./navMenu";
import ProfilePic from "./profilePic";
import { doFetchUserProfile } from "../../firebase/firestore";
import { LogOut } from "lucide-react";
import {motion} from "framer-motion";
import { animateSideFadeIn, animateVerticalFadeIn } from "../../constants/anim";




const LeftSidebar = ({ user, signOut, back, setPage }) => {
  const [userData, setUserData] = useState(null);
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


  return (
    userData && (
      <aside
        className="min-w-64 h-full bg-light-pink p-4 flex flex-col items-center max-md:hidden fixed z-10"
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
          <NavMenu user={userData} />
          <div className="flex flex-col justify-end h-full w-full">
            <button className=" flex items-center self-start m-4 font-bold gap-2" onClick={signOut}>
                <LogOut size={24} />
                Sign Out
            </button>
          </div>
        </>
      </aside>
    )
  );
};

export { LeftSidebar, ProfilePic };
