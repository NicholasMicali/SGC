import React from "react";

const GoogleButton = ({text, onClick, icon}) => {
    return (
        <button className="w-full rounded-lg p-1 flex justify-center gap-4 items-center border-[2px] md:h-[50px] md:mb-8" onClick={onClick}>
            <img src={icon} height={25} width={25}/>
            <p className=" text-sm">{text}</p>
        </button>   
    );
}

export default GoogleButton;