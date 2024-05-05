import React, { useState } from 'react';
import TextCard from '../home/textCard';

const Post = ({back, post}) => {


  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <button onClick={back}>Back</button>
      <TextCard loc={post.location} date={"April 24th"} title={post.title} description={post.desc} studName={post.uName}/>
    </div>
  );
};

export default Post;