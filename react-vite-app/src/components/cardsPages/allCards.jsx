import React, { useEffect, useState } from 'react';
import { doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile } from "../../firebase/firestore";
import CardInfo from '../home/cardInfo';


const AllCards = ({back, user, select}) => {

  const [userProfile, setUserProfile] = useState(null);
  const [cards, setCards] = useState([]);

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

//to do: Make it look nicer

/* maybe use this later
<div className="flex w-full justify-between text-xl py-2 m-4">
            <p>{card.title}</p>
            <p className="text-gray-500">┃</p>
            <p>{card.location} 📍</p>
            <p className="text-gray-500">┃</p>
            <p>{card.furthest} miles</p>
            <p className="text-gray-500">┃</p>
            <p>{card.people}</p>
            <img src={personIcon} alt="Person Icon" className="h-6 w-6 mr-2" />
*/

/*
<div key={index} className="card">
            <h2 className="font-bold text-xl mt-4">{card.title}</h2>
            <p>{card.text}</p>
            <button onClick={() => select(card)}>Select Card!</button>
          </div>
*/
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back}>Back</button>
      <div className="self-start">
          All Cards:
      </div>
      {cards.map((card, index) => (
        <div className="w-full cursor-pointer" onClick={() => select(card)}>
          <CardInfo name={card.title} location="1" miles="250" people={card.posts ? card.posts.length : "0"}/>
        </div>
      ))}
    </div>
  );
};

export default AllCards;