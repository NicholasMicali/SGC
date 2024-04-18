import React from 'react';

const Recieve = ({back}) => {


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      Received a Card?
    </div>
  );
};

export default Recieve;