import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import ProfilePic from "./profilePic";
import { doFetchUserProfile } from "../../firebase/firestore";



const SmallProfile = ({ user }) => {
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


    
  if (userData == null){
    return <>Not Signed In...</>
  }

  return (
    <>
        {userData && (
            <div className="flex flex-col items-center">
            {userData.image ? (
                <img
                src={userData.image}
                alt=""
                className="w-12 h-12 rounded-full mr-2"
                />
            ) : (
                <ProfilePic username={userData.firstName} className="w-12 h-12 rounded-full mr-2" />
            )}
            </div>
        )}
    </>
  );

  
}

export default SmallProfile;


