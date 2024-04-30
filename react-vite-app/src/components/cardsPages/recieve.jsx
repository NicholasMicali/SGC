import React, { useState, useEffect } from "react";
import CustomInput from '../auth/customInput';
import { doCreatePost, doPostToCard, doFetchCard, doFetchUserProfile } from "../../firebase/firestore";

// TO DO: If the user navigates from a new card on feed page to here, 
// have this component take in the value of the card ID as a prop, the call onCodeEntered so they go right to the form.

const Recieve = ({back, user, initCode, first}) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCodeFound, setIsCodeFound] = useState(false);
  const [code, setCode] = useState('');
  const [cid, setCid] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
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
        const post = await doCreatePost(cid, user.uid, name, title, desc, userProfile.location, images);
        await doPostToCard(cid, post.id);
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
        const card = await doFetchCard(code);
        setCid(card.id);
      } catch (error) {
        console.error("Card not Found", error);
        alert("Failed to find card: " + error.message);
        return;
      }   
    }
  }

  if (isCreatingPost) {
    return <><button onClick={back}>Back</button><div>Act of Kindness Posted: {title}</div></>
  }

  if (isCodeFound) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <button onClick={back}>Back</button>
        <div className="self-start font-bold text-xl">Post to card</div>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
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
          <CustomInput
            type="text"
            placeholder="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id="desc"
            labelName="Description"
          />
          <button type="submit">
            Post!
          </button>
        </form>
      </div>
    );
  }

  return(
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back}>Back</button>
      <div className="self-start font-bold text-xl">Enter the code on the back of your card</div>
      <form onSubmit={onCodeEntered} className="w-full flex flex-col gap-5 items-center">
        <CustomInput
          type="code"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="code"
          labelName="Code"
        />
        <button type="submit">
          Find Card!
        </button>
      </form>
    </div>
  )
};

export default Recieve;