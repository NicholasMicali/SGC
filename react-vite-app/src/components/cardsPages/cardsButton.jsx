import React from "react";

const CardsButton = ({width, height, text, borderColor, textColor, backgroundColor, onClick}) => {
    console.log("width: ", width, "height: ", height)
    return(
        //Note the FIGMA shows width as 207px, but using that width changes the leftside menu size for some reason
        <button className="rounded-lg border-[2px]" onClick={onClick}  
        style={{
            'borderColor': borderColor, 
            'backgroundColor': backgroundColor,
            'width': width,
            "height" : height
        }}>
        {/*<img src={icon} height={10} width={10}/> */}
        <p style={{ color:textColor, fontSize:18}} className = "flex justify-center items-center">{text}</p>
            
       
        </button>


    );       
} 
export default CardsButton;