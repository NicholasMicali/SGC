import React from "react";
import CardsButton from '../components/cardsPages/cardsButton.jsx';

const getStared = ({sizeHeader, sizeText}) => {
    return(
        <div>
            <h1 style={{ fontSize: sizeHeader }}>
                Welcome!
            </h1>
            <CardsButton
                text="All cards"
                borderColor="#BEDF3D"
                textColor="#8DAB1C"
                backgroundColor="#EAF4C0"
                //icon={None}//add icon in later
                onClick={() => setSubPage('all')}>
            </CardsButton>
        </div>


    );       
} 
export default getStarted;