import React, {useState} from "react";
import GradientButton from "./gradientButton.jsx"
import ThankYouSVG from "../../assets/ThankYou.svg"
import ChallengeIcon from "../../assets/ChallengeIcon.svg"
import CardsButton from "./cardsButton.jsx";
import Logo from "../../assets/logo.svg";

import Confetti from 'react-confetti';
//uses the gradientButton component. Hard coded the thank you for spreading goodness message,
//also hard coded in the button text
// ThankYou component takes in the button 
const ThankYou = ({ onButtonClick, isNarrowScreen, onChallenge }) => {
  const [confetti, setConfetti] = useState(200);
  setTimeout(() => {setConfetti(0)}, 2000);
  if (!isNarrowScreen)
    return (
      <div className="flex flex-col items-center justify-center">
        <Confetti numberOfPieces={confetti} />
        <img src={Logo} alt="Spread Goodness logo" className="w-128 h-128 p-4 mt-6" /> 
        <p className="font-sans text-black pb-3 text-base sm:text-2xl md:text-2xl lg:text-3xl">Thank you for spreading goodness!</p>
        <img src={ThankYouSVG} alt="Thank You" className="w-2/5" />
        <div className="text-2xl my-4">Challenge someone else:</div>
        <CardsButton
          width="180px"
          height="51.75px"
          text="Challenge"
          borderColor="#FD3B8A"
          textColor="#FC086B"
          backgroundColor="#FFD3E5"
          icon={ChallengeIcon}
          onClick={onChallenge}
        />
        <div className="my-4"></div>
        <GradientButton
          width="320px"
          height="50px"
          onClick={onButtonClick}
          text="Go back to Homepage"
          className="w-4/5 h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
        >
        </GradientButton>
      </div>
    );

    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-sans text-black mt-20 pb-3">Thank you for spreading goodness!</p>
        <img src={ThankYouSVG} alt="Thank You" className="w-2/5" />
        <div className="text-2xl my-4">Challenge someone else:</div>
        <CardsButton
          width="180px"
          height="51.75px"
          text="Challenge"
          borderColor="#FD3B8A"
          textColor="#FC086B"
          backgroundColor="#FFD3E5"
          icon={ChallengeIcon}
          onClick={onChallenge}
        />
        <div className="my-4"></div>
        <GradientButton
          width="100vw"
          height="50px"
          onClick={onButtonClick}
          text="Go back to Homepage"
          className="w-30 h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
        >
        </GradientButton>
      </div>
    )
  };
  
export default ThankYou;


