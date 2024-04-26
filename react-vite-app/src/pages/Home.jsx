import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import SearchBar from '../components/auth/searchbar.jsx';
import LeftSidebar from '../components/home/leftSideBar';
import RightSidebar from '../components/home/rightSideBar';
import AllCards from '../components/cardsPages/allCards.jsx';
import CardFeed from '../components/cardsPages/cardFeed.jsx';
import NewCard from '../components/cardsPages/newCard.jsx';
import Challenge from '../components/cardsPages/challenge.jsx';
import Recieve from '../components/cardsPages/recieve.jsx';
import CardsButton from '../components/cardsPages/cardsButton.jsx';
import AllCardIcon from "../assets/AllCardIcon.svg"
import NewCardIcon from "../assets/NewCardIcon.svg"
import ReceiveIcon from "../assets/ReceiveIcon.svg"
import ChallengeIcon from "../assets/ChallengeIcon.svg"

const HomePage = () => {


  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [subPage, setSubPage] = useState('feed');
  const [currentCard, setCurrentCard] = useState(null);

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

  const handleSearch = searchTerm => {
    //console.log(`Search term: ${searchTerm}`);
    // Implement your search functionality here
  };
  const returnToFeed = () => {
    setSubPage('feed');
  }

  const selectCard = (card) => {
    setCurrentCard(card);
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
            <SearchBar onSearch={handleSearch} width = "full"/>
            <div className="flex flex-row justify-between gap-4 my-4 w-full">
              <CardsButton
                text = "All Cards"
                borderColor="#BEDF3D"
                textColor= "#8DAB1C"
                backgroundColor="#EAF4C0"
                icon={AllCardIcon}
                onClick={() => setSubPage('all')}>
                </CardsButton>
              <CardsButton
                text = "New Card"
                borderColor="#48B8E6"
                textColor= "#1D9FD5"
                backgroundColor="#D1EDF9"
                icon={NewCardIcon}
                onClick={() => setSubPage('new')}>
              </CardsButton>
              <CardsButton
                text = "Receive"
                borderColor="#F2DD69"
                textColor= "#EDD134"
                backgroundColor="#FCF7DA"
                icon={ReceiveIcon}
                onClick={() => setSubPage('recieve')}>
              </CardsButton>
              <CardsButton
                text = "Challenge"
                borderColor="#FD3B8A"
                textColor= "#FC086B"
                backgroundColor="#FFD3E5"
                icon={ChallengeIcon}
                onClick={() => setSubPage('challenge')}>
              </CardsButton>
            </div>
            <CardFeed card={currentCard}/>
          </>
          }
        {subPage == 'all' && <AllCards back={returnToFeed} user={currentUser} select={selectCard}/>}
        {subPage == 'new' && <NewCard back={returnToFeed} user={currentUser}/>}
        {subPage == 'recieve' && <Recieve back={returnToFeed} user={currentUser}/>}
        {subPage == 'challenge' && <Challenge back={returnToFeed}/>}
      </div>
      <RightSidebar />
    </div>

  );
};

export default HomePage;
