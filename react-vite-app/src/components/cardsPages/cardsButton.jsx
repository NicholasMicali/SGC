import React from "react";

const CardsButton = ({ text, borderColor, textColor, backgroundColor, onClick, icon }) => {
  return (
    <button
      className="w-[180px] h-[51.75px] rounded-lg border-[2px] flex justify-center items-center px-4"
      onClick={onClick}
      style={{
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }}
    >
      <span style={{ color: textColor, fontSize: '18px', fontFamily: 'sans-serif', marginRight: icon ? '8px' : '0' }}>
        {text}
      </span>
      {icon && <img src={icon} alt={`${text} icon`} className="icon-class" style={{ width: '20px', height: '20px' }} />}
    </button>
  );
};

export default CardsButton;
