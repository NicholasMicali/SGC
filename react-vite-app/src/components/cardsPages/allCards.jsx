import React from 'react';
import { doFetchCard } from "../../firebase/firestore";
import { doFetchUserProfile } from "../../firebase/firestore";


const AllCards = ({back}) => {

//to do: fetch the full user profile from firestore, for each card in user.cards fetch the card from firestore and display it.
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      All Cards!
    </div>
  );
};

export default AllCards;