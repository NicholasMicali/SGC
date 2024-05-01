import React from "react";

const CardInfo = ({name, location, miles, people, isSidebar}) => {

    if (isSidebar){
        return (
              <div className={"flex flex-col justify-between bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end w-full h-full rounded-xl px-4 py-10 bg-opacity-40"}>
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
          );
}

    return (
      <div className="w-full">
        <div className={"flex flex-row justify-between bg-gradient-to-tr rounded-xl px-20 py-4 from-gradient-start via-gradient-mid to-gradient-end w-full bg-opacity-40"}>
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