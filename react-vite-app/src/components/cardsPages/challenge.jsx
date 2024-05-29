import React, { useState } from 'react';
import backOfCard from "../../assets/backOfCard.jpg";

const Challenge = ({back, code, cid}) => {

  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const subject = "You have been challenged!"
  const body = "Welcome to the Spread Goodness Challenge!\n\nJohn Smith has challenged you to spread kindness in the world, and write about it.\nHere is a message from them:\n\n" + text + "\n\nTo spread goodness, enter this code at spreadgoodness.com:\n\n " + code;

  const handleShare = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };



  if (code == null || cid == null){
    return (
    <>
      <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}>Back</button>
      <div className="font-semibold text-2xl mt-4">No card selected</div>
      <img src={backOfCard} className="w-4/12 mb-4 mt-4"></img>
      <button onClick={back} className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-8 bg-opacity-60 text-white font-sans text-xl">Select Card</button>
    </>
    );
  }

//<div className="w-60 h-60 border-2 flex flex-row items-center justify-center mb-6">Preview of card</div>

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}>Back</button>
      <h1 className="self-start font-bold text-3xl">Challenge someone!</h1>
      <div className="font-semibold text-2xl mt-6">Your Code: {code}</div>
      <img src={backOfCard} className="w-4/12 mb-4"></img>
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