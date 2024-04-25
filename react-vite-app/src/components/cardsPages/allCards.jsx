import React, { useEffect, useState } from 'react';
import { doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile } from "../../firebase/firestore";
import CardsButton from '../cardsPages/cardsButton.jsx';
import NewCard from '../cardsPages/newCard.jsx';
import Recieve from '../cardsPages/recieve.jsx';
import personIcon from '../../assets/person_icon.svg';


const AllCards = ({back, user}) => {

  const [userProfile, setUserProfile] = useState(null);
  const [cards, setCards] = useState([]);
  const [subPage, setSubPage] = useState('all');
  cards.push({
    "title": "title",
    "location": "location",
    "furthest": "furthest",
    "people": "people"
  })
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
        console.log(profile.data());
        if (profile && profile.data().cards) {
          fetchCards(profile.data().cards);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  const returnToAllCards = () => {
    setSubPage('all');
  }

  const fetchCards = async (cardIds) => {
    try {
      const cardPromises = cardIds.map(cardId => doFetchCard(cardId));
      const cardObjects = await Promise.all(cardPromises);
      setCards(cardObjects.map(cardObj => cardObj.data()));
      console.log(cards[0])
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

//to do: fetch the full user profile from firestore, for each card in user.cards fetch the card from firestore and display it.
  return (
    <div className="flex flex-col w-full gap-4">
      <button className="self-start ml-4 mt-2" onClick={back}>Back</button>
      <div className="container w=full">
      <div className="mb-10 text-2xl font-bold">All Cards</div>
      <div className="flex w-full space-x-4 mb-5">
        <CardsButton
                  className = "flex-grow"
                  text = "New Card"
                  borderColor="#48B8E6"
                  textColor= "#1D9FD5"
                  backgroundColor="#D1EDF9"
                  //icon={None}//add icon in later
                  onClick={() => setSubPage('new')}>
        </CardsButton>
        <CardsButton
                className = "flex-grow"
                text = "Receive"
                borderColor="#F2DD69"
                textColor= "#EDD134"
                backgroundColor="#FCF7DA"
                //icon={None}//add icon in later
                onClick={() => setSubPage('recieve')}>
        </CardsButton>
      </div>   
    </div>
      <div className="flex flex-col items-start">
      <div className="mb-2 text-lg font-bold">Your Challenge Cards</div>
      {cards.map((card, index) => (
          <div key={index} className={`card bg-allCards-green rounded-xl w-full max-w-2xl max-w-lg ${index !== cards.length - 1 ? 'mb-4' : ''}`}>
          <div className="flex w-full justify-between text-xl py-2 m-4">
            <p>{card.title}</p>
            <p className="text-gray-500">┃</p>
            <p>{card.location} 📍</p>
            <p className="text-gray-500">┃</p>
            <p>{card.furthest} miles</p>
            <p className="text-gray-500">┃</p>
            <p>{card.people}</p>
            <img src={personIcon} alt="Person Icon" className="h-6 w-6 mr-10" />
          </div>
        </div>
      ))}
      </div>
        {subPage == 'new' && <NewCard back={returnToAllCards} user={user}/>}
        {subPage == 'recieve' && <Recieve back={returnToAllCards} user={user}/>}
    </div>
  );
};

export default AllCards;