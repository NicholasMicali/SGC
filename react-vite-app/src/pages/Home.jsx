import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import { doFetchCardByCode } from '../firebase/firestore.js';
import SearchBar from '../components/home/searchbar.jsx';
import LeftSidebar from '../components/home/leftSideBar';
import RightSidebar from '../components/home/rightSideBar';
import AllCards from '../components/cardsPages/allCards.jsx';
import CardFeed from '../components/cardsPages/cardFeed.jsx';
import NewCard from '../components/cardsPages/newCard.jsx';
import Challenge from '../components/cardsPages/challenge.jsx';
import Recieve from '../components/cardsPages/recieve.jsx';
import CardsButton from '../components/cardsPages/cardsButton.jsx';
import GetStarted from '../components/home/getStarted.jsx';
import AllCardIcon from "../assets/AllCardIcon.svg"
import NewCardIcon from "../assets/NewCardIcon.svg"
import ReceiveIcon from "../assets/ReceiveIcon.svg"
import ChallengeIcon from "../assets/ChallengeIcon.svg"


const HomePage = () => {

  const { currentUser } = useAuth();
  // console.log(JSON.stringify(currentUser));
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState('feed');
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCid, setCurrentCid] = useState(null);
  const [isFirstPost, setIsFirstPost] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
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

/*
  const fetchUserProfile = async () => {
    try {
      const profile = await doFetchUserProfile(user.uid);
      setUserProfile(profile.data());
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
    return profile;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);
*/

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

  const handleSearch = async (searchTerm) => {
    try {
      const card = await doFetchCardByCode(searchTerm);
      if (card != null){
        selectCard(card.data(), card.id);
      }
    } catch (error) {
      console.error("Card not Found", error);
      alert("Failed to find card: " + error.message);
      return;
    }   
  };

  const returnToFeed = () => {
    setSubPage('feed');
  }

  const selectCard = (card, cid) => {
    setCurrentCard(card);
    setCurrentCid(cid);
    setSubPage('feed');
  }

  const firstPost = () => {
    setIsFirstPost(true)
    setSubPage('recieve');
  }

  if (isSigningOut) {
    return (<Navigate to={"/"} replace={true} />)
  }


  return (
    <div className="flex h-screen">
       {!isNarrowScreen && (
        <LeftSidebar user={currentUser} signOut={signOut} page="Feed" />
      )}
      <div className="flex-grow flex flex-col items-center overflow-auto px-20 py-10">
        {subPage == 'feed' && 
          <>
            <SearchBar onSearch={handleSearch} width = "full"/>
            <div className="flex flex-row justify-between gap-4 my-4 w-full">
              <CardsButton
                width = '180px'
                height='51.75px'
                text = "All cards"
                borderColor="#BEDF3D"
                textColor= "#8DAB1C"
                backgroundColor="#EAF4C0"
                icon={AllCardIcon}
                onClick={() => setSubPage('all')}>
                </CardsButton>
              <CardsButton
                width = '180px'
                height='51.75px'
                text = "New Card"
                borderColor="#48B8E6"
                textColor= "#1D9FD5"
                backgroundColor="#D1EDF9"
                icon={NewCardIcon}
                onClick={() => setSubPage('new')}>
              </CardsButton>
              <CardsButton
                width = '180px'
                height='51.75px'
                text = "Receive"
                borderColor="#F2DD69"
                textColor= "#EDD134"
                backgroundColor="#FCF7DA"
                icon={ReceiveIcon}
                onClick={() => setSubPage('recieve')}>
              </CardsButton>
              <CardsButton
                width = '180px'
                height='51.75px'
                text = "Challenge"
                borderColor="#FD3B8A"
                textColor= "#FC086B"
                backgroundColor="#FFD3E5"
                icon={ChallengeIcon}
                onClick={() => setSubPage('challenge')}>
              </CardsButton>
            </div>
            <CardFeed 
              card={currentCard}
              setSubPage={setSubPage}
              firstPost={firstPost}
              />
          </>
        }
        {subPage == 'all' && <AllCards back={returnToFeed} user={currentUser} select={selectCard}/>}
        {subPage == 'new' && <NewCard back={returnToFeed} user={currentUser}/>}
        {subPage == 'recieve' && <Recieve back={returnToFeed} user={currentUser} initCode={currentCid} first={isFirstPost}/>}
        {subPage == 'challenge' && <Challenge back={returnToFeed} user={currentUser} code={currentCard ? currentCard.code : null} cid={currentCid}/>}
      </div>
      {!isNarrowScreen ? (
        <RightSidebar card={currentCard} />
      ) : (
        <LeftSidebar user={currentUser} signOut={signOut} page="Feed" />
      )}
    </div>

  );
};

export default HomePage;
