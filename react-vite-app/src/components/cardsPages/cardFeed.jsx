import React, { useEffect, useState } from 'react';
import CardInfo from '../home/cardInfo.jsx';
import GetStarted from '../home/getStarted.jsx'
import TextCard from '../home/textCard.jsx';
import { doFetchPost } from '../../firebase/firestore.js';
import NoPosts from '../home/noPosts.jsx';
import NewCardIcon from "../../assets/NewCardIcon.svg"

const CardFeed = ({user, card, setSubPage, firstPost, isNarrowScreen, handleOpen, infoType}) => {
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



  // if (!cardExists) {
  //   return(
  //     <div>
  //       <GetStarted 
  //             sizeHeader='32px'
  //             handleOpen={handleOpen}>
  //       </GetStarted>
  //     </div>
      
  //   );
  // }


  return (
    cardExists && 
    <div className="flex flex-col justify-center items-center w-full">
      <div className="self-start">
          Card Info:
      </div>
      <CardInfo name ={card.code} infoType = "cardName" location={card.cities == null ? 0 : card.cities.length} miles={card.distance} people={card.posts == null ? 0 : card.posts.length} color={(card.cEmail === user.email)} isNarrowScreen={isNarrowScreen}/>
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
          <div className="font-semibold text-2xl self-start mt-8">Goodness Posts:</div>

          {[...posts].reverse().map((post, index) => (
            <TextCard key={index} loc={post.location} date={post.postDate} description={post.desc} name={post.uName} type={post.postType} first={index === posts.length - 1} image={post.image ? post.image : null} stickers={post?.stickers} isNarrowScreen={isNarrowScreen}/>
          ))}

        </>
      }
    </div>
  );

};

export default CardFeed;