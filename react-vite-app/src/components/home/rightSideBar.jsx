import React from 'react';
import CardInfo from './cardInfo.jsx';

const RightSidebar = ({card}) => {

  if (card == null) {
    return(
      <div className="w-64 bg-gray-200 h-full overflow-auto p-4 flex flex-col items-center justify-center">
        <p>No Display Card</p>
      </div>
      
    );
  }

  return (
    <div className="w-64 bg-gray-200 h-full overflow-auto p-4 flex flex-col items-center justify-center">
      <CardInfo
                    name={card.title}
                    location='1'
                    miles='250'
                    people={card.posts == null ? 0 : card.posts.length}
                    isSidebar={true} 
                    color={true}/>
    </div>
  );
};

export default RightSidebar;
