import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import LeftSidebar from '../components/home/leftSideBar';
import RightSidebar from '../components/home/rightSideBar';


const AccountPage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async (e) => {
    e.preventDefault()
    try {
      const user = await doSignOut();
    } catch (error) {
    // Handle errors here, such as displaying a message to the user
      console.error('Log out failed:', error);
      alert('Failed to log out: ' + error.message);
      return;
    }
    //console.log("user logged out: " + user);
    setIsSigningOut(true);

  }



  if (isSigningOut) {
    return (<Navigate to={"/"} replace={true} />)
  }


  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut} page="Account Settings"/>
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        Account Settings Page
      </div>
    </div>
  );
};

export default AccountPage;