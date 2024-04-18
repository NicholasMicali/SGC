import React from "react";

const CardsButton = ({text, borderColor, textColor, backgroundColor, onClick}) => {
    return(
        //Note the FIGMA shows width as 207px, but using that width changes the leftside menu size for some reason
        <button className="w-[180px] h-[51.75px] rounded-lg border-[2px]" onClick={onClick} 
        style={{
            'borderColor': borderColor, 
            'backgroundColor': backgroundColor
        }}>
        {/*<img src={icon} height={10} width={10}/> */}
        <p style={{ color:textColor, fontSize:18, fontFamily: ""}} className = "flex justify-center items-center">{text}</p>
            
       
        </button>


    );       
} 
export default CardsButton;