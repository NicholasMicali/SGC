import React from "react";

//Used mainly for ThankYou component right now, but we can reuse for other similar buttons 
const GradientButton = ({ height, width, text, onClick }) => {
    return (
      <button
        className="flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl px-2 py-1 bg-opacity-40"
        onClick={onClick}
        style={{
          width: width, 
          height: height
        }}
      >
        <span className="text-white font-sans text-xl">
          {text}
        </span>
      </button>
    );
  };
  
  export default GradientButton;
  