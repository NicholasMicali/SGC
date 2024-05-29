import React from "react";

const CardInfo = ({name, location, miles, people, isSidebar, color, isNarrowScreen}) => {

    if (isNarrowScreen){
        return (
              <div className={color ? "flex flex-row justify-between bg-gradient-to-tr rounded-xl px-2 py-2 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full h-1/8 bg-opacity-40" : "flex flex-col justify-between rounded-xl px-4 py-10 w-full h-full bg-opacity-40 border border-2"}>
                  <div className="flex flex-col justify-center items-center">
                      <div className="font-bold text-sm">{name}</div>
                      <div className="text-sm">Card Name</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                      <div className="font-bold text-sm">{location}</div>
                      <div className="text-sm">Locations 📍</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                      <div className="font-bold text-sm">{miles} miles</div>
                      <div className="text-sm">Distance</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                      <div className="font-bold text-sm">{people}</div>
                      <div className="text-sm">People</div>
                  </div>
              </div>
          );
}


    return (
       <div className= "w-full" >
        <div className={color ? "flex flex-row justify-between bg-gradient-to-tr rounded-xl px-20 py-4 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full bg-opacity-40" : "flex flex-row justify-between rounded-xl px-20 py-4 w-full bg-opacity-40 border-2"} style={{backgroundColor: '#fff6fa'}}>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{name}</div>
                <div className="mt-2">Card Name</div>
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
                <div className="mt-2">People</div>
            </div>
        </div>
      </div>
    );
};

export default CardInfo;