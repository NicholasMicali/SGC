import React from "react";
import personIcon from '../../assets/person_icon.svg';

const CardInfo = ({name, code, location, miles, people, isSidebar, color, isNarrowScreen, infoType}) => {
    console.log('CardInfo Props:', { name, code, location, miles, people });

    if (!isNarrowScreen){
        return (
            <div className= "w-full" >
             <div className={color ? "flex flex-row justify-between bg-gradient-to-tr rounded-xl px-20 py-4 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full bg-opacity-40" : "flex flex-row justify-between rounded-xl px-20 py-4 w-full bg-opacity-40 border-2"} style={{backgroundColor: '#fff6fa'}}>
             <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{name}</div>
                {infoType === 'cardName' ? (
                    <div className="mt-2">Card Code</div>
                ) : (
                <div className="mt-2">Card Name</div> 
                )}
                </div>
                 <div className="flex flex-col justify-center items-center">
                     <div className="font-bold text-xl">{location}</div>
                     <div className="mt-2">Locations 📍</div>
                 </div>
                 <div className="flex flex-col justify-center items-center">
                     <div className="font-bold text-xl">{miles} miles</div>
                     <div className="mt-2">Distance</div>
                 </div>
                 <div className="flex flex-col justify-center items-center">
                     <div className="font-bold text-xl">{people}</div>
                     <div className="mt-2">Posts</div>
                 </div>
             </div>
           </div>
         );
}

return (
    <div className={color ? "flex flex-row justify-between bg-gradient-to-tr rounded-xl px-2 py-2 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full h-1/8 bg-opacity-40" : "flex flex-row justify-between rounded-xl px-2 py-2 w-full h-1/8 bg-opacity-40 border border-2"}>
        <div className="flex flex-row justify-center items-center">
            <div className="font-normal text-sm">{name}</div>
            
        </div>
        |
        <div className="flex flex-row justify-center items-center">
            <div className="font-normal text-sm">{location}</div>
            <div className="text-sm">📍</div>
            
        </div>
        |
        <div className="flex flex-row justify-center items-center">
            <div className="font-normal text-sm">{miles} miles</div>
            <div className="text-sm"></div>
        </div>
        |
        <div className="flex flex-row justify-center items-center">
            <div className="font-normal text-sm">{people}</div>
            <img src={personIcon} alt="Person Icon" className="h-fill w-fill" />
        </div>
    </div>
);


};

export default CardInfo;


