import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../new componenets/Button";
const text = [
  "After they spread goodness they might nominate # more! And then these # might nominate # more... Imagine how far your seed of goodness might travel! Keep coming back to see all the posts populated by people you have inspired."
];

const NominateOthers = ({ setNominateOthers, toAllCards }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg max-sm:w-[85%] w-[400px] h-[435px] p-4 relative flex flex-col justify-between items-center border-4 border-bold-green
        }`}
      >
        <X className="self-end hover:cursor-pointer" onClick={setNominateOthers} />

        <div className="h-full flex flex-col justify-evenly">
          {step === 1 && (
            <>
              <p className="text-2xl font-semibold">You just nominated # others!</p>
              <p className="text-2lg font-medium">{text[0]}</p>
              <div className="flex flex-col gap-1 justify-center items-center text-lg font-medium">
              <Button
                  buttonText="See My Posts!"
                  onClick={() => {
                    setNominateOthers();
                    toAllCards();
                  }}
                  className="bg-bold-green hover:bg-bold-green-hover text-white p-5 rounded-md"
                />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default NominateOthers;
