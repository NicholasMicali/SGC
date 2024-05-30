import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import NavMenu from "./navMenu";
import { doFetchUserProfile } from "../../firebase/firestore";


const ProfilePic = ({ username }) => {
  const colors = {
    A: "#FF8C00",
    B: "#800000",
    C: "#DC143C",
    D: "#FFFF00",
    E: "#008000",
    F: "#FF00FF",
    G: "#008000",
    H: "#FFD700",
    I: "#4B0082",
    J: "#00FF00",
    K: "#BDB76B",
    L: "#800080",
    M: "#FF00FF",
    N: "#000080",
    O: "#FFA500",
    P: "#6495ED",
    Q: "#D19275",
    R: "#FF0000",
    S: "#0000FF",
    T: "#40E0D0",
    U: "#7B68EE",
    V: "#EE82EE",
    W: "#FFFFFF",
    X: "#BC8F8F",
    Y: "#FFFF00",
    Z: "#8A2BE2",
  };
  const firstChar = username.charAt(0).toUpperCase();
  const color = colors[firstChar];

  return (
    <div
      className="relative w-12 h-12 rounded-full mr-3" style={{backgroundColor: color}}
    >
      <p className=" text-xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {firstChar}
      </p>
    </div>
  );
};



const LeftSidebar = ({ user, signOut, page, back }) => {
  const [userData, setUserData] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const subPagesChangeIcon = ['all', 'new', 'recieve', 'challenge'];



  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMenuVisible(false);
    } else {
      setIsMenuVisible(true);
    }
  };

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

  useEffect(() => {

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (userData == null){
    return <>Not Signed In...</>
  }

  return (
    userData && (
       <div className={`w-64 h-full bg-gray-200 overflow-auto p-4 flex flex-col items-center`}>
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
            <NavMenu page={page} />
            <div className="flex flex-col justify-end h-full">
              <button className="mxy-4 font-bold" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </>
      </div>
    )
  );
};


export { LeftSidebar, ProfilePic }
