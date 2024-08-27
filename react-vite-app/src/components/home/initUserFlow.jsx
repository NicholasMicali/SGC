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
import { useNavigate } from "react-router-dom";


/*** 
 * These 'texts' can be swapped with an array of components if you want to make each card separtely 
 * add more elemenst to the array to make it more steps!
 * customize the buttons to make them fit the style of the app
 * ***/

const InitUserFlow = ({onClose, toReceive, toNewCard}) => {
  const [userData, setUserData] = useState(null);
  const { currentUser:user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("init");
  const navigate = useNavigate()

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

  useEffect(() => {
    if (currentScreen === 'end') {
      onClose(); // Call onClose to close the modal
    }
  }, [currentScreen, onClose]);

  const notYetScreen = () => {
    setCurrentScreen("notYet");

  };
  const challengeScreen = () => {
    setCurrentScreen("challenge");
  };
  


  return (
    (userData && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] h-2/5 p-4 relative flex flex-col justify-between items-center border-2" style={{ borderColor: currentScreen === "notYet" ? '#03B5E5' : '#F21C80' }}>
        <div className="text-center relative w-full h-full flex flex-col justify-start items-center">
          <div className="w-full h-full flex flex-col">
            {currentScreen == "init" && (
            <div className="w-full h-full flex flex-col justify-start items-center flex-grow">
                <div className="mb-4 font-bold justify-center">Did you already complete your first step of the mission and do something kind and unexpected for someone you don’t know?</div>
                <div className="h-full flex flex-row gap-4 justify-center">
                    <CardsButton
                            width="130px"
                            height="71px"
                            text="Yes!"
                            borderColor="#F21C80"
                            textColor="#FFFFFF"
                            backgroundColor="#F21C80"
                            staticStyle={true}
                            onClick={challengeScreen}
                            className="hover:color-gray-400 flex justify-center"
                        />

                        <CardsButton
                            width="130px"
                            height="71px"
                            text="Not Yet!"
                            borderColor="#03B5E5"
                            textColor="#FFFFFF"
                            backgroundColor="#03B5E5"
                            staticStyle={true}
                            onClick={notYetScreen}
                            className="hover:color-gray-400 flex self-center"
                        />   
                </div>  
            </div>
              
              
            )}
            {currentScreen == "notYet" && (
                <div className="mb-4 font-bold text-left">
                    <div>No Problem!<br></br><br></br>
                    Go out and brighten someone’s day! Then come back here to tell us all about it! We can’t wait!
                    </div>
                    <div className = "text-center font-normal text-sm">
                    <br></br>
                    <br></br>
                    Not sure what to do?<br></br>
                        <button className = "underline text-[#03B5E5]" onClick={() => navigate('/inspiration')}>
                        Click here for some ideas
                        </button>
                    </div>
                </div>
            )}
            {currentScreen == "challenge" && (
            <div className="mb-4 font-bold">Are you ready to 
            Accept a challenge or Start a new challenge?
                <div className="h-full flex flex-row justify-center gap-4 font-normal leading-tight"> 
                    <CardsButton
                        width="141px"
                        height="93px"
                        text="Accept a Challenge"
                        borderColor="#F21C80"
                        textColor="#FFFFFF"
                        backgroundColor="#F21C80"
                        staticStyle={true}
                        onClick={() => {
                            setCurrentScreen('end');
                            toReceive()}}
                        className="hover:color-gray-400 flex justify-center"
                    />

                    <CardsButton
                        width="141px"
                        height="93px"
                        text="Start a New Challenge"
                        borderColor="#03B5E5"
                        textColor="#FFFFFF"
                        backgroundColor="#03B5E5"
                        staticStyle={true}
                        onClick={() => {
                            setCurrentScreen('end');
                            toNewCard()}}
                        className="hover:color-gray-400 flex self-center"
                    />   
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>)
  );
};

export default InitUserFlow;
