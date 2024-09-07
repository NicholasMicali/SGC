import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../new componenets/Button";
const text = [
  "Did you already complete your first step of the mission and do something kind and unexpected for someone you don’t know?",
  "Go out and brighten someone’s day! Then come back here to tell us all about it! We can’t wait!",
];

const GetStarted = ({ setGetStarted }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg max-sm:w-[85%] w-[400px] h-[435px] p-4 relative flex flex-col justify-between items-center border-4 ${
          step == 1 || step == 2 ? "border-bold-pink" : "border-bold-blue"
        }`}
      >
        <X className="self-end hover:cursor-pointer" onClick={setGetStarted} />

        <div className="h-full flex flex-col justify-evenly">
          {step === 0 && (
            <>
              <p className="text-2xl font-semibold">No Problem!</p>
              <p className="text-2xl font-semibold">{text[1]}</p>
              <div className="flex flex-col gap-1 justify-center items-center text-lg font-medium">
                <p>Not sure what to do?</p>
                <a href="" className=" underline text-bold-blue">
                  Click here for some ideas!
                </a>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <p className=" font-semibold text-2xl">{text[0]}</p>
              <div className="flex gap-5">
                <Button
                  buttonText="Yes!"
                  onClick={() => setStep(2)}
                  className="bg-bold-pink hover:bg-bold-pink-hover text-white p-5 rounded-md"
                />
                <Button
                  buttonText="Not yet!"
                  onClick={() => setStep(0)}
                  className="bg-bold-blue hover:bg-bold-blue-hover text-white p-5 rounded-md"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-2xl font-semibold ">
                Are you ready to <br />
                <span className="text-bold-blue">Accept</span> a challenge or{" "}
                <br />
                <span className="text-bold-pink">Start</span> a new challenge?
              </p>
              <div className="flex gap-5">
                <Button
                  buttonText="Accept a Challenge"
                  onClick={() => setStep(2)}
                  className="bg-bold-blue hover:bg-bold-blue-hover text-white p-5 rounded-md"
                />
                <Button
                  buttonText="Start a New Challenge"
                  onClick={() => setStep(0)}
                  className="bg-bold-pink hover:bg-bold-pink-hover  text-white p-5 rounded-md"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
