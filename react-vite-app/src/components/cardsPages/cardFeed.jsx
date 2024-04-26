import React from 'react';
import CardInfo from '../home/cardInfo.jsx';
import GetStarted from '../home/getStarted.jsx'
import TextCard from '../home/textCard.jsx';

const CardFeed = ({card, setSubPage}) => {

  if (card === null) {
    return(
      <div>
        <GetStarted 
              sizeHeader='32px'
              sizeText='24px'
              setSubPage={setSubPage}>
        </GetStarted>
      </div>
      
    );
  }
/* To DO: Fetch all the posts from the card, map them to TextCards:
          {posts.map((post, index) => (
            <TextCard loc={post.location} date={"April 24th"} title={post.title} description={post.desc} studName={post.uName}/>
          ))}
*/

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