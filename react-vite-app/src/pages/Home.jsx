import React from 'react';
import { useAuth } from '../auth/index';

const HomePage = () => {

  const { currentUser } = useAuth();

  return (
    <>
      <h1>This is the Home Page!</h1>
      <div>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
      <div></div>
    </>

  );
};

export default HomePage;
