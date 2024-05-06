import React, { useEffect, useState } from 'react';
import CardInfo from '../home/cardInfo.jsx';
import GetStarted from '../home/getStarted.jsx'
import TextCard from '../home/textCard.jsx';
import { doFetchPost } from '../../firebase/firestore.js';
import NoPosts from '../home/noPosts.jsx';
import NewCardIcon from "../../assets/NewCardIcon.svg"

const CardFeed = ({card, setSubPage, firstPost}) => {
  const [cardExists, setCardExists] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (card != null) {
      setCardExists(true);
      if (card.posts != null) {
        fetchPosts(card.posts);
      }
    }

  }, [card]);

  const fetchPosts = async (postIds) => {
    try {
      const postPromises = postIds.map(postId => doFetchPost(postId));
      const postObjects = await Promise.all(postPromises);
      setPosts(postObjects.map(postObj => postObj.data()));
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };



  if (!cardExists) {
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


  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="self-start">
          Card Info:
      </div>
      <CardInfo name={card.title} location="San Luis Obispo" miles="260" people="7"/>
      {card.posts == null ? 
        <>
          <NoPosts 
          height = '299px'
          width = '570px'
          textTop = 'No Posts Yet?'
          textBottom = "Add the First Post!"
          borderColor = 'linear-gradient(to right, #ADD8E6, #B19CD9, #FFB6C1)'
          textColorTop = "#C21E56"
          textColorBottom = "#8B008B"
          backgroundColor = "White"
          icon = {NewCardIcon}
          onClick={firstPost}
          >
          </NoPosts>
        </>
      : 
        <>
          <div>total posts: {card.posts.length}</div>
          {posts.map((post, index) => (
            <TextCard loc={post.location} date={"April 24th"} title={post.title} description={post.desc} studName={post.uName}/>
          ))}
        </>
      }
    </div>
  );
};

export default CardFeed;