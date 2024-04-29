import React, { useState } from 'react';

const Challenge = ({back, code}) => {

  const [email, setEmail] = useState('')

  if (code == null){
    return (
    <>
      <button onClick={back}>Back</button>
      <div>No card selected</div>
    </>
    );
  }


  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back}>Back</button>
      <h1>Challenge someone!</h1>
      <div className="font-bold">Code: {code}</div>
      <div className="w-40 h-40 border-2 flex flex-row items-center justify-center">Preview of card</div>
      <input label="Email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <button>Send Challenge</button>
    </div>
  );
};

export default Challenge;