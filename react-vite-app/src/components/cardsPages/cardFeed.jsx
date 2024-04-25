import React from 'react';
import CardInfo from '../home/cardInfo.jsx';

const CardFeed = ({card}) => {

  if (card === null) {
    return(
      <div>
        No Card?
      </div>
    );
  }


  return (
    <div className="flex flex-col justify-center items-center w-full">
      <CardInfo name={card.title} location="San Luis Obispo" miles="260" people="7"/>
      {card.posts == null ? 
        <>
          <div>No posts yet?</div>
          <button>Add the first post!</button>
        </>
      : 
        <>
          <div>total posts: {card.posts.length}</div>
        </>
      }
    </div>
  );
};

export default CardFeed;