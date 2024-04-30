import React from 'react';
import CardInfo from './cardInfo.jsx';

const RightSidebar = ({card}) => {
  return (
    <div className="w-64 bg-gray-200 h-full overflow-auto p-4 flex flex-col items-center justify-center">
      <CardInfo
                    name="{card.name}"
                    location="{card.location}"
                    miles="{card.miles}"
                    people="{card.people}"
                    isSidebar={true} />
    </div>
  );
};

export default RightSidebar;
