import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import LeftSidebar from '../components/home/leftSideBar';
import RightSidebar from '../components/home/rightSideBar';
import AllCards from '../components/cardsPages/allCards.jsx';
import CardFeed from '../components/cardsPages/cardFeed.jsx';
import NewCard from '../components/cardsPages/newCard.jsx';
import Challenge from '../components/cardsPages/challenge.jsx';
import Recieve from '../components/cardsPages/recieve.jsx';
import CardInfo from '../components/home/cardInfo(new).jsx';


const HomePage = () => {


  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState('feed');
  //const [currentCard, setCurrentCard] = useState('Default Card');

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

  const returnToFeed = () => {
    setSubPage('feed');
  }

  if (isSigningOut) {
    return (<Navigate to={"/"} replace={true} />)
  }



  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut} page="home"/>
      <div className="flex-grow flex flex-col items-center overflow-auto px-20 py-10">
        {subPage == 'feed' && 
          <>
            <div className="flex flex-row justify-center gap-4 my-4">
              <button onClick={() => setSubPage('all')}>all cards</button>
              <button onClick={() => setSubPage('new')}>new</button>
              <button onClick={() => setSubPage('recieve')}>recieve</button>
              <button onClick={() => setSubPage('challenge')}>challenge</button>
            </div>
            <CardFeed/>
          </>
          }
        {subPage == 'all' && <AllCards back={returnToFeed}/>}
        {subPage == 'new' && <NewCard back={returnToFeed} user={currentUser}/>}
        {subPage == 'recieve' && <Recieve back={returnToFeed}/>}
        {subPage == 'challenge' && <Challenge back={returnToFeed}/>}
      </div>
      <RightSidebar />
    </div>

  );
};

export default HomePage;
