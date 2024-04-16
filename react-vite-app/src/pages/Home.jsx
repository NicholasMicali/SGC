import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import LeftSidebar from '../components/home/leftSideBar';
import RightSidebar from '../components/home/rightSideBar';
import AllCards from '../components/cards/allCards.jsx';
import CardInfo from '../components/home/cardInfo(new).jsx';


const HomePage = () => {

  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState('feed');

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


// to do: create subpages compoentes and slot them into the conditional render.
  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut} page="home"/>
      <div className="flex-grow flex flex-col items-center overflow-auto p-4">
        <CardInfo name="Hero-2" location="San Luis Obispo" miles="260" people="7"/>
        {subPage == 'feed' && <></>}
        {subPage == 'all' && <AllCards/>}
        {subPage == 'new' && <></>}
        {subPage == 'received' && <></>}
        {subPage == 'challenge' && <></>}
      </div>
      <RightSidebar />
    </div>

  );
};

export default HomePage;
