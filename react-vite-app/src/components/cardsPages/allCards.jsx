import React, { useEffect, useState } from 'react';
import { doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile } from "../../firebase/firestore";


const AllCards = ({back, user}) => {

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

//to do: fetch the full user profile from firestore, for each card in user.cards fetch the card from firestore and display it.
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      <div>All Cards:</div>
      <div className="flex flex-col items-left">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h2 className="font-bold text-xl mt-4">{card.title}</h2>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;