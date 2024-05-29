import React from "react";
import GradientButton from "./gradientButton.jsx"
import ThankYouSVG from "../../assets/ThankYou.svg"

//uses the gradientButton component. Hard coded the thank you for spreading goodness message,
//also hard coded in the button text
// ThankYou component takes in the button 
const ThankYou = ({ onButtonClick, isNarrowScreen }) => {
  if (!isNarrowScreen)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-sans text-black mb-5 pb-5">Thank you for spreading goodness!</p>
        <img src={ThankYouSVG} alt="Thank You" className="w-128 h-128" />
        <GradientButton
          width="750px"
          height="50px"
          onClick={onButtonClick}
          text="Go back to Homepage"
          className="mt-2.5 w-45 h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
        >
        </GradientButton>
      </div>
    );

    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-sans text-black mt-20 mb-5 pb-5">Thank you for spreading goodness!</p>
        <img src={ThankYouSVG} alt="Thank You" className="w-128 h-128" />
        <GradientButton
          width="100vw"
          height="50px"
          onClick={onButtonClick}
          text="Go back to Homepage"
          className="mt-2.5 w-45 h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
        >
        </GradientButton>
      </div>
    )
  };
  
export default ThankYou;


