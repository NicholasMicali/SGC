import React from "react";

const GoogleButton = ({text, onClick, icon}) => {
    return (
        <button className="w-full rounded-lg p-1 flex justify-center gap-5 items-center border-[2px]" onClick={onClick}>
            <img src={icon} height={30} width={30}/>
            <p>{text}</p>
        </button>   
    );
}

export default GoogleButton;