import React from 'react';

const Challenge = ({back}) => {


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      Challenge Someone!
    </div>
  );
};

export default Challenge;