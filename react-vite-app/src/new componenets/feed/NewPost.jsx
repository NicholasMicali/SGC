import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button";
const text = [
  "Tell us what you did to Spread Goodness!", 

];

const NewPost = ({ setChallenge, toChallenge, location, user, code }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg max-sm:w-[85%] w-[400px] h-[435px] p-4 relative flex flex-col justify-between items-center border-4 border-bold-green
        }`}
      >
        <X className="self-end hover:cursor-pointer" onClick={setChallenge} />

        <div className="h-full flex flex-col justify-evenly">
          {step === 0 && (
            <>
              <p className="text-2xl font-semibold">{text[0]}</p>
              <p className="text-2lg font-medium">hi</p>
              <div className="flex flex-col gap-1 justify-center items-center text-lg font-medium">
                  
              </div>
            </>
          )}
            {step === 1 && (
            <>
              <p className="text-2xl font-semibold ">
                Are you ready to <br />
                <span className="text-bold-blue">Accept</span> a challenge or{" "}
                <br />
                <span className="text-bold-pink">Start</span> a new challenge?
              </p>
              <div className="flex gap-5">

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default NewPost;
