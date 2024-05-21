import React, { useState, useEffect } from "react";
import CustomInput from '../auth/customInput';
import { doCreatePost, doPostToCard, doFetchCard, doFetchUserProfile, doFetchCardByCode, doCardToUserProfile } from "../../firebase/firestore";
import ThankYou from  "./thankYou.jsx"

// TO DO: If the user navigates from a new card on feed page to here, 
// have this component take in the value of the card ID as a prop, the call onCodeEntered so they go right to the form.

const Recieve = ({back, user, initCode, first}) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCodeFound, setIsCodeFound] = useState(false);
  const [code, setCode] = useState('');
  const [cid, setCid] = useState('');
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
        if (first && initCode != null) {
          setCid(initCode);
          setIsCodeFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingPost){
      setIsCreatingPost(true);
      try {
        console.log(cid);
        const post = await doCreatePost(cid, user.uid, userProfile.firstName, desc, userProfile.location, images);
        await doPostToCard(cid, post.id);
        await doCardToUserProfile(user.uid, cid);
      } catch (error) {
        console.error("Create post failed:", error);
        alert("Failed to post to card: " + error.message);
        return;
      }   
    }
  };

  const onCodeEntered = async (e) => {
    e.preventDefault();
    if (!isCodeFound){
      setIsCodeFound(true);
      try {
        console.log(code);
        const card = await doFetchCardByCode(code);
        setCid(card.id);
      } catch (error) {
        console.error("Card not Found", error);
        alert("Failed to find card: " + error.message);
        return;
      }   
    }
  }


/*
  <CustomInput
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            labelName="Name"
          />
          <CustomInput
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            labelName="Title"
          />
*/
  if (isCreatingPost) {
    return (
      <>
        <div>{userProfile.name} posted an act of kindness!</div>
        <ThankYou
          onButtonClick={back}>
        </ThankYou>
      </>
    );
  }

  if (isCodeFound) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}> Back</button>
        <div className="self-start font-bold text-3xl">Post to card</div>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'desc'} className="self-start">Description</label>
            <textarea
              className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder={"write about your act of kindness!"}
              type='text'
              id='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-4 bg-opacity-60 text-white font-sans text-xl">
            Post!
          </button>
        </form>
      </div>
    );
  }

  return(
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}> Back</button>
      <div className="self-start font-bold text-3xl">Recieved a card?</div>
      <form onSubmit={onCodeEntered} className="w-full flex flex-col gap-5 items-center">
        <div className="flex flex-col gap-1 w-full mt-6">
            <label htmlFor={'code'} className="self-start">Code</label>
            <input
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Enter code from the card (e.g., 12abc345)"
              pattern="^\d{2}[A-Za-z]{3}\d{3}$"
              title="Code should be in the format: 12abc345 (2 digits, 3 letters, 3 digits)"
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
        </div>
        <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-6 bg-opacity-60 text-white font-sans text-xl">
          Next
        </button>
      </form>
    </div>
  )
};

export default Recieve;