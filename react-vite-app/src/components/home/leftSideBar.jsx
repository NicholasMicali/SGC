import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import NavMenu from "./navMenu";
import ProfilePic from "./profilePic";
import { doFetchUserProfile } from "../../firebase/firestore";


const LeftSidebar = ({ user, signOut, page, back, setPage }) => {
  const [userData, setUserData] = useState(null);

  const subPagesChangeIcon = ['all', 'new', 'recieve', 'challenge'];

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

  if (userData == null){
    return <>Not Signed In...</>
  }

  return (
    userData && (
       <div className={`w-64 h-full bg-light-pink overflow-auto p-4 flex flex-col items-center max-md:hidden`}>
          <>
           <img src={Logo} alt="Spread Goodness logo" className="p-4 mb-4" />
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
              <div>{userData.firstName + " " + userData.lastName}</div>
            </div>
            <NavMenu page={page} setPage={setPage} />
            <div className="flex flex-col justify-end h-full">
              <button className="m-4 font-bold" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </>
      </div>
    )
  );
};


export { LeftSidebar, ProfilePic }
