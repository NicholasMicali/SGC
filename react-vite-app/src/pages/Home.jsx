import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import SearchBar from '../components/searchbar.jsx';


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

  const handleSearch = searchTerm => {
    //console.log(`Search term: ${searchTerm}`);
    // Implement your search functionality here
  };

  if (isSigningOut) {
    return (<Navigate to={"/"} replace={true} />)
  }

  return (
    <>
      <h1>This is the Home Page!</h1>
      <div>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
      <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      </div>
      <button onClick={onSubmit}>Sign Out</button>
    </>

  );
};

export default HomePage;
