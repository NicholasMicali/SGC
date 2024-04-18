import React from 'react';

const AllCards = ({back}) => {


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={back}>Back</button>
      All Cards!
    </div>
  );
};

export default AllCards;