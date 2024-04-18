import React, { useState } from "react";
import CustomInput from '../auth/customInput';
import { doCreateCard, doCardToUserProfile } from "../../firebase/firestore";


const NewCard = ({back, user}) => {

  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isCreatingCard){
      setIsCreatingCard(true);
      try {
        const card = await doCreateCard(user.uid, title, code, text, email);
        await doCardToUserProfile(user.uid, card.id);
      } catch (error) {
        console.error("Create card failed:", error);
        alert("Failed to create card: " + error.message);
        return;
      }   
    }
  };

  if (isCreatingCard) {
    return <><button onClick={back}>Back</button><div>Card Created: {title}</div></>
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back}>Back</button>
      <div className="self-start font-bold text-xl">New Card</div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5 items-center">
        <CustomInput
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          labelName="Title"
        />
        <CustomInput
          type="code"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="code"
          labelName="Code"
        />
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
        <button type="submit">
          Create Card!
        </button>
      </form>
    </div>
  );
};

export default NewCard;