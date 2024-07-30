import React, { useState, useEffect } from "react";
import { positiveMessages } from "../../constants/pageConstants";
import {X} from "lucide-react";
const CongratsCard = ({ onClickX, onClickChallenge }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // This code runs only once after the initial render,
    // setting the message to a random value from positiveMessages
    const randomMessage =
      positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    setMessage(randomMessage);
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="fixed z-20  bg-black bg-opacity-50 inset-0 flex items-center justify-center">
      <div className="card w-96 bg-base-100 flex p-5 items-center justify-center gap-5">
        <button className=" self-end" onClick={onClickX}>
          <X />
        </button>
        {message}
        <div className="btn btn-wide cursor-pointer" onClick={onClickChallenge}>
          Now it's time to Challenge others!
        </div>
      </div>
    </div>
  );
};

export default CongratsCard;
