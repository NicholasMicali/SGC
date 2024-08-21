import React, { useState, useEffect } from 'react';
import backOfCard from "../../assets/backOfCard.jpg";
import AllCardIcon from "../../assets/AllCardIcon.svg";
import CardsButton from './cardsButton';
import { ArrowLeft } from "lucide-react";
import { doFetchUserProfile } from '../../firebase/firestore';

const Challenge = ({back, user, code, cid, cards}) => {

  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const subject = "You have been challenged!"
  const body = "Welcome to the Spread Goodness Challenge!\n\n" + userProfile?.firstName + " " + userProfile?.lastName + " has challenged you to spread kindness in the world, and write about it.\nHere is a message from them:\n\n" + text + "\n\nTo spread goodness, enter the code below at spreadgoodness-72ac1.web.app\n\n " + code;


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
  }, [user.uid]);


  const handleShare = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };



  if (code == null || cid == null){
    return (
    <>
      <button onClick={back} className="self-start flex items-center mt-4 mb-4">
        <ArrowLeft /> Go Back
      </button>
      <div className="font-semibold text-3xl mt-4">No card selected</div>
      <img src={backOfCard} className="w-5/12 mb-4 mt-4"></img>
      <CardsButton
        width="180px"
        height="65px"
        text="See my posts"
        borderColor="#95AD2A"
        textColor="#FFFFFF"
        backgroundColor="#95AD2A"
        onClick={cards}
      />
    </>
    );
  }

//<div className="w-60 h-60 border-2 flex flex-row items-center justify-center mb-6">Preview of card</div>

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back} className="self-start flex items-center mt-4 mb-4">
        <ArrowLeft /> Go Back
      </button>
      <h1 className="font-bold text-3xl">Challenge someone!</h1>
      <img src={backOfCard} className="w-4/12 mt-4 mb-4"></img>
      <div className="font-semibold text-xl mt-3">Your Code: {code}</div>
      <div className="email-share-container w-full">
        <div className="flex flex-col gap-1 w-full mt-3">
          <label htmlFor="email">Recipient Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
          />
        </div>
        <div className="flex flex-col gap-1 w-full mt-3">
          <label htmlFor="body">Personal Message</label>
          <textarea
            id="body"
            value={text}
            placeholder='write a message to the person you are challenging! (include the code in your message)'
            onChange={(e) => setText(e.target.value)}
            required
            className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
          />
        </div>
        <button onClick={handleShare} className="share-button w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-6 bg-opacity-60 text-white font-sans text-xl">Share via Email</button>
      </div>
    </div>
  );
};

export default Challenge;