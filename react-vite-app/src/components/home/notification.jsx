import React, { useEffect, useState } from 'react';
import { doFetchUserProfile } from "../../firebase/firestore";

const Notification = ({user}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
        if (profile && profile.data().unread) {
          setUnreadCount(profile.data().unread);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  return (
    <>
        {unreadCount > 0 && (
            <div className="bg-red-600 text-white rounded-full h-6 w-6 z-40 flex items-center justify-center text-xs">
                {unreadCount}
            </div>
        )}
    </>
  );
};

export default Notification;
