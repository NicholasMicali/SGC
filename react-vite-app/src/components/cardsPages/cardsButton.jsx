import React from "react";

const CardsButton = ({text, borderColor, textColor, backgroundColor, onClick}) => {
    return(
        <button className="w-full rounded-lg border-[2px]" onClick={onClick} 
        style={{
            'borderColor': borderColor, 
            'backgroundColor': backgroundColor
        }}>
        {/*<img src={icon} height={10} width={10}/> */}
        <p style={{ color:textColor}} className = "text-md">{text}</p>
            
       
        </button>


    );       
} 
export default CardsButton;