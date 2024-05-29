import React from "react";
import CardsButton from '../cardsPages/cardsButton.jsx';
import smile from "../../assets/smile.png";


/*
<div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                        <p style={{ fontSize: sizeText }} className="font-bold text-lg">Create your own card with</p>
                        <CardsButton
                            width = '162px'
                            height='46.575px'
                            text = "New Card"
                            borderColor="#48B8E6"
                            textColor= "#1D9FD5"
                            backgroundColor="#D1EDF9"
                            //icon={None}//add icon in later
                            onClick={() => setSubPage('new')}>
                        </CardsButton>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p style={{ fontSize: sizeText }} className="font-bold text-lg">Then, challenge other with</p>
                        <CardsButton
                            width = '162px'
                            height='46.575px'
                            text = "Challenge"
                            borderColor="#FD3B8A"
                            textColor= "#FC086B"
                            backgroundColor="#FFD3E5"
                            //icon={None}//add icon in later
                            onClick={() => setSubPage('challenge')}>
                        </CardsButton>
                    </div>
                <p style={{ fontSize: sizeText }} className="text-lg font-bold">or</p>
                <div className="flex items-center space-x-4">
                    <p style={{ fontSize: sizeText }} className="text-lg font-bold">Write the code you received with</p>
                    <CardsButton
                        width = '162px'
                        height='46.575px'
                        text = "Receive"
                        borderColor="#F2DD69"
                        textColor= "#EDD134"
                        backgroundColor="#FCF7DA"
                        //icon={None}//add icon in later
                        onClick={() => setSubPage('recieve')}>
                    </CardsButton>
                </div>
                <p style={{ fontSize: sizeText }} className="text-lg font-bold">or</p>
                <p style={{ fontSize: sizeText }} className="text-lg font-bold">You can search other codes with the <font color="#48B8E6">Icon Button</font></p>
                

                
            </div>
*/

//<div className="text-2xl font-medium">No Card Selected</div>
const GetStarted = ({sizeHeader, sizeText, setSubPage}) => {
    return(
        <div>
            <h1 style={{ fontSize: sizeHeader }} className="font-bold flex flex-col justify-center items-center">
                <span className="my-6 text-center">Welcome to the Spread Goodness Challenge!</span>
                <img className="w-6/12"src={smile}></img>
                <button className="mb-8 text-xl font-semibold text-white flex flex-col justify-center items-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl py-3 px-5 mt-3 bg-opacity-60">
                    Get started
                </button>
            </h1>

            
        </div>


    );       
} 
export default GetStarted;