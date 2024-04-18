import React, { useState } from "react";
import CustomInput from '../auth/customInput';


const NewCard = ({back}) => {

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      <div className="self-start font-bold text-xl">New Card</div>
      <form className="w-full flex flex-col gap-5 items-center">
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
      </form>
    </div>
  );
};

export default NewCard;