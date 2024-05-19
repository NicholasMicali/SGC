import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import LeftSidebar from '../components/home/leftSideBar';

const Classroom = () => {
    const { currentUser } = useAuth();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsNarrowScreen(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  
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
        {!isNarrowScreen && (
          <LeftSidebar user={currentUser} signOut={signOut} page="Classroom" />
        )}
        <div className="flex-grow flex flex-col items-center overflow-auto p-4">
          Classroom
        </div>
        {isNarrowScreen && (
          <LeftSidebar user={currentUser} signOut={signOut} page="Classroom" />
        )}
      </div>
    );
}

export default Classroom