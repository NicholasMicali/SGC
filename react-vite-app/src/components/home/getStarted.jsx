import React from "react";
import CardsButton from '../cardsPages/cardsButton.jsx';

const GetStarted = ({sizeHeader, sizeText, setSubPage}) => {
    return(
        <div>
            <h1 style={{ fontSize: sizeHeader }} className="font-bold flex flex-col justify-center items-center">
                <span className="mb-2">Welcome to Spread Goodness Challenge!</span>
                {/* <span className="-mt-2">Challenge!</span> */}
                <p style={{ fontSize: sizeText }} className="mb-8 font-normal flex flex-col justify-center items-center">
                    To get started
                </p>
            </h1>

            
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
                <p style={{ fontSize: sizeText }} className="text-lg font-bold">You can search other codes with the <font COLOR="#48B8E6">Icon Button</font></p>
                

                
            </div>
        </div>


    );       
} 
export default GetStarted;