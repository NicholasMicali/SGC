import React, { useEffect, useState } from 'react';
import { doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile, doRemoveCardFromUserProfile } from "../../firebase/firestore";
import CardInfo from '../home/cardInfo';


const AllCards = ({back, user, select}) => {

  const [userProfile, setUserProfile] = useState(null);
  const [cards, setCards] = useState([]);
  const [cids, setCids] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
        //console.log(profile.data());
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
      setCids(cardIds);
      const cardPromises = cardIds.map(cardId => doFetchCard(cardId));
      const cardObjects = await Promise.all(cardPromises);
      setCards(cardObjects.map(cardObj => cardObj.data()));
      //console.log(cards[0])
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  const removeCard = async (cardId, rIndex) => {
    try {
      await doRemoveCardFromUserProfile(user.uid, cardId);
      setCids((prevCids) => prevCids.filter((cid, index) => index !== rIndex));
      setCards((prevCards) => prevCards.filter((card, index) => index !== rIndex));
      console.log("Card Removed");
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}>Back</button>
      <div className="self-start">
          All Cards:
      </div>
      {cards.map((card, index) => (
        <div className="w-full flex flex-row items-center">
          <div className="w-full cursor-pointer" onClick={() => select(card, cids[index])}>
            <CardInfo name={card.title} location="1" miles="250" people={card.posts ? card.posts.length : "0"} color={(card.cEmail === user.email)}/>
          </div>
          <button className="rounded-2xl border-[1px] h-12 py-2 px-3 border-black" onClick={() => removeCard(cids[index], index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default AllCards;