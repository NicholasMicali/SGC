import React, { useState, useEffect } from 'react';
import GradientButton from '../cardsPages/gradientButton';
import { ArrowLeft } from "lucide-react";
import MenuXWhite from "../../assets/MenuXWhite.svg";
import MenuBackgroundPNG from "../../assets/MenuBackground.png";
import CardsButton from "../cardsPages/cardsButton.jsx";
import AllCardIcon from "../../assets/AllCardIcon.svg";
import NewCardIcon from "../../assets/NewCardIcon.svg";
import ReceiveIcon from "../../assets/ReceiveIcon.svg";
import ChallengeIcon from "../../assets/ChallengeIcon.svg";
import InspirationIcon from "../../assets/InspirationIcon.svg";
import JournalIcon from "../../assets/JournalIcon.svg";
import classroomIcon from "../../assets/classroom.svg";
import { doFetchUserProfile } from '../../firebase/firestore.js';
import { useAuth } from '../../auth/index.jsx';


/*** 
 * These 'texts' can be swapped with an array of components if you want to make each card separtely 
 * add more elemenst to the array to make it more steps!
 * customize the buttons to make them fit the style of the app
 * ***/
const getTexts = (userType) => {
  const texts = [
    <div className="flex flex-col justify-center items-center text-center">
      <div className="font-bold mb-8 text-2xl">What is the Spread Goodness Challenge?</div>
      <div className="text-xl w-4/5">Do something kind and unexpected for someone you don't know!</div>
    </div>,
    userType === "Student" && <div className="flex flex-col justify-center items-center text-center">
      <div className="font-bold mb-8 text-2xl">If you are a student, first join your classroom at this page:</div>
      <div className="flex flex-row items-center gap-2 text-xl"><img src={classroomIcon} alt="Classroom Icon" /> Classroom</div>
    </div>,
    <div className="flex flex-col justify-center items-center text-center">
      <div className="mb-4 text-xl mt-6  w-4/5">If you were challenged by someone, use this button:</div>
      <CardsButton
        width="180px"
        height="51.75px"
        text="Receive"
        borderColor="#F2DD69"
        textColor="#EDD134"
        backgroundColor="#FCF7DA"
        icon={ReceiveIcon}
        staticStyle={true}
      />
      <div className="mb-4 text-xl mt-4 w-4/5">If you want to start your own challenge, use this button:</div>
      <CardsButton
        width="180px"
        height="51.75px"
        text="New Card"
        borderColor="#48B8E6"
        textColor="#1D9FD5"
        backgroundColor="#D1EDF9"
        icon={NewCardIcon}
        staticStyle={true}
      />
    </div>,
    <div className="flex flex-col justify-center items-center text-center">
      <div className="font-bold mb-6 mt-4 text-2xl ">Fill out the form and post!</div>
      <div className="text-xl mb-4 w-4/5">Feel stuck on how to spread goodness? Visit these pages:</div>
      <div className="flex flex-row items-center gap-2 text-xl"><img src={InspirationIcon} alt="Inspiration Icon" /> Inspiration </div>
      <div className="flex flex-row items-center gap-2 text-xl"><img src={JournalIcon} alt="Journal Icon" /> Journal </div>
    </div>,
    <div className="flex flex-col justify-center items-center text-center">
      <div className="text-xl w-4/5 mt-2 mb-4">After you post, challenge someone else here:</div>
      <CardsButton
        width="180px"
        height="51.75px"
        text="Challenge"
        borderColor="#FD3B8A"
        textColor="#FC086B"
        backgroundColor="#FFD3E5"
        icon={ChallengeIcon}
        staticStyle={true}
      />
      <div className="text-xl mt-4 mb-4 w-4/5">The cards you create and post to will show up here:</div>
      <CardsButton
        width="180px"
        height="51.75px"
        text="All cards"
        borderColor="#BEDF3D"
        textColor="#8DAB1C"
        backgroundColor="#EAF4C0"
        icon={AllCardIcon}
        staticStyle={true}
      />
    </div>,
    <div className="flex flex-col justify-center items-center text-center">
      <div className="font-bold mb-8 text-2xl">You are ready to spread goodness!</div>
      <div className="text-xl">Click 'Get Started' to begin</div>
    </div>
  ];
  return texts.filter(Boolean);

}

const WalkthroughModal = ({onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState(null);
  const { currentUser:user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserData(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

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

  const texts = getTexts(userData?.userType);

  return (
    (userData && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] h-3/5 p-4 relative flex flex-col justify-center items-center">
        <div className="">
          <img
            src={MenuBackgroundPNG}
            alt="Menu Background"
            className="absolute top-0 right-0 w-203 h-151 z-20"
          />
          <button
            className="z-30 p-1 absolute top-4 right-5 mt-2 ml-3"
            onClick={onClose}
          >
            <img src={MenuXWhite} alt="Menu Icon" className="w-31 h-17" />
         </button>
        </div>
        <div className="text-center">
          <div className="mb-4">{texts[currentStep]}</div>
          <div className="">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="absolute bottom-4 left-4 hover:color-gray-400 flex justify-center"
              >
                <ArrowLeft/>
                Go Back
              </button>
            )}
            {currentStep < texts.length - 1 ? (
              <div className="absolute bottom-2 right-4">
                <GradientButton
                  width="100px"
                  height="50px"
                  onClick={nextStep}
                  text="Next"
                  className="self-center h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
                />
              </div>
            ) : (
              <div className="absolute bottom-2 right-4">
                <GradientButton
                  width="140px"
                  height="50px"
                  onClick={onClose}
                  text="Get Started"
                  className="self-center h-13 bg-gray-100 border border-gray-300 rounded-lg text-sm font-sans"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>)
  );
};

export default WalkthroughModal;
