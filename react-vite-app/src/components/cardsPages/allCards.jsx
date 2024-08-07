import React, { useEffect, useState } from 'react';
import { doDecrementUserCards, doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile, doRemoveCardFromUserProfile } from "../../firebase/firestore";
import CardInfo from '../home/cardInfo';
import CardsButton from "./cardsButton.jsx";
import NewCardIcon from "../../assets/NewCardIcon.svg";
import StudentInfo from '../home/studentInfo.jsx';
import { ArrowLeft } from "lucide-react";
import { Trash } from "lucide-react";


const AllCards = ({back, user, select, isNarrowScreen, newCard, infoType, currentCid, setCurrentCard}) => {

  const [userProfile, setUserProfile] = useState(null);
  const [cards, setCards] = useState([]);
  const [cids, setCids] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
        if (profile && profile.data().cards) {
          console.log("cards: " + profile.data().cards);
          fetchCards(profile.data().cards);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  const fetchCards = async (cardIds) => {
    try {
      setCids(cardIds);
      const cardPromises = cardIds.map(cardId => doFetchCard(cardId));
      const cardObjects = await Promise.all(cardPromises);
      console.log(cardObjects.map(cardObj => cardObj.data()));
      setCards(cardObjects.map(cardObj => cardObj.data()));
      //console.log(cards[0])
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  const removeCard = async (cardId, rIndex) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await doRemoveCardFromUserProfile(user.uid, cardId);
        await doDecrementUserCards(user.uid);
        if (currentCid === cardId) {
          setCurrentCard(null);
        }
        setCids((prevCids) => prevCids.filter((cid, index) => index !== rIndex));
        setCards((prevCards) => prevCards.filter((card, index) => index !== rIndex));
        console.log("Card Removed");
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    }
  };



  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <button onClick={back} className="self-start flex items-center">
        <ArrowLeft /> Go Back
      </button>
      <div className="w-full flex flex-col items-center mt-4">
        {userProfile && <StudentInfo student={userProfile} isNarrowScreen={isNarrowScreen}/>}
      </div>
      <div className="text-3xl mt-2 font-bold self-start">
        My Cards:
      </div>
      {cards.map((card, index) => (
        // need this for testing in case card is deleted from database
        card &&
        <div className="w-full flex flex-row items-center" key={index}>
          <div className="w-full cursor-pointer" onClick={() => select(card, cids[index])}>
            <CardInfo name={card.title} infoType="cardCode" location={card.cities ? card.cities.length : "0"} miles={card.distance} people={card.posts ? card.posts.length : "0"} color={(card.cEmail === user.email)} isNarrowScreen={isNarrowScreen}/>
          </div>
          {/* <button className="py-2 px-3 ml-4" onClick={() => removeCard(cids[index], index)}><Trash></Trash></button> */}
        </div>
      ))}
      <div className="self-start">
        <CardsButton
          width="180px"
          height="51.75px"
          text="New Card"
          borderColor="#48B8E6"
          textColor="#1D9FD5"
          backgroundColor="#D1EDF9"
          icon={NewCardIcon}
          onClick={newCard}
        ></CardsButton>
      </div>
    </div>
  );
};

export default AllCards;