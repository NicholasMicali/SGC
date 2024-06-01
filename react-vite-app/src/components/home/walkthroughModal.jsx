import React, { useState } from 'react';


/*** 
 * These 'texts' can be swapped with an array of components if you want to make each card separtely 
 * add more elemenst to the array to make it more steps!
 * customize the buttons to make them fit the style of the app
 * ***/

const texts = [
  "Welcome to the walkthrough! This is step 1.",
  "Here you can see step 2 of the walkthrough.",
  "This is step 3. You're doing great!",
  "Final step! Click 'Get Started' to begin using the app."
];

const WalkthroughModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < texts.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <p className="mb-4">{texts[currentStep]}</p>
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {currentStep < texts.length - 1 ? (
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-auto"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkthroughModal;
