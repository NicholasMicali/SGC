import React, { useState, useEffect } from "react";
import CustomInput from '../auth/customInput';
import { doCreateCard, doCardToUserProfile, doFetchUserProfile, doCreatePost, doPostToCard, doFetchCard } from "../../firebase/firestore";
import ThankYou from  "./thankYou.jsx"
import StickerDrop from "./stickerDrop.jsx";


const NewCard = ({back, user, select}) => {

  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [createdCard, setCreatedCard] = useState(null);
  const [cid, setCid] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await doFetchUserProfile(user.uid);
        setUserProfile(profile.data());
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.uid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingCard){
      if (!/^\d{2}[A-Za-z]{3}\d{3}$/.test(code)) {
        console.log("Invalid code format.");
        alert("Invalid Code Format");
        return;
      }
      setIsCreatingCard(true);
      try {
        const card = await doCreateCard(user.uid, title, code, userProfile.email);
        await doCardToUserProfile(user.uid, card.id);
        const post = await doCreatePost(card.id, user.uid, userProfile.firstName, text, userProfile.location, images);
        await doPostToCard(card.id, post.id);
        const cardObj = await doFetchCard(card.id);
        setCid(card.id);
        setCreatedCard(cardObj.data());
        console.log(card);
      } catch (error) {
        console.error("Create card failed:", error);
        alert("Failed to create card: " + error.message);
        return;
      }   
    }
  };

  if (isCreatingCard && createdCard) {
    return <>
     <div>Card Created: {title}
    </div>
      <ThankYou
        onButtonClick={() => select(createdCard, cid)}>
      </ThankYou>
   </>
  }


/*
        <CustomInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          labelName="Email"
        />
        <CustomInput
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="text"
          labelName="Text"
        />
        <CustomInput
          type="code"
          placeholder="45cat135"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="code"
          labelName="Code (must follow this format: 12abc345)"
        />
*/

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button className="rounded-2xl border-[1px] py-2 px-3 border-black self-end" onClick={back}> Back</button>
      <div className="self-start font-bold text-3xl">New Card</div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
        <CustomInput
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          labelName="Title"
        />
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'code'} className="self-start">Code</label>
            <input
              className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder="Enter code (e.g., 12abc345)"
              pattern="^\d{2}[A-Za-z]{3}\d{3}$"
              title="Code must be in the format: 12abc345 (2 digits, 3 letters, 3 digits)"
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
        </div>
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={'text'} className="self-start">Description</label>
            <textarea
              className="h-64 resize-none rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
              placeholder={"write about how you spread goodness!"}
              type='text'
              id='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
        </div>
        <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-4 bg-opacity-60 text-white font-sans text-xl">
          Create Card!
        </button>
      </form>
      <StickerDrop/>
    </div>
  );
};

export default NewCard;