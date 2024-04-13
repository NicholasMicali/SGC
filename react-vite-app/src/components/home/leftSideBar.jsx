import React from 'react';
import Logo from "../../assets/logo.svg";

const LeftSidebar = ({user, signOut}) => {
  return (
    <div className="w-64 bg-gray-200 h-full overflow-auto p-4 flex flex-col items-center">
      <img src={Logo} alt="Spread Goodness logo" className="p-4 mb-4"/>
      <div className="flex flex-row mb-6">
        <img src={user.photoURL} alt="Profile Pic" className="w-12 h-12 rounded-full mr-2"></img>
        <div>{user.displayName || user.email}</div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default LeftSidebar;
