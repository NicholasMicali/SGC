import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';


const HomePage = () => {

  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await doSignOut();
    } catch (error) {
    // Handle errors here, such as displaying a message to the user
      console.error('Log out failed:', error);
      alert('Failed to log out: ' + error.message);
      return;
    }
    //console.log("user logged out: " + user);
    setIsSigningOut(true);

  }


  if (isSigningOut) {
    return (<Navigate to={"/"} replace={true} />)
  }

  return (
    <>
      <h1>This is the Home Page!</h1>
      <div>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
      <button onClick={onSubmit}>Sign Out</button>
    </>

  );
};

export default HomePage;
