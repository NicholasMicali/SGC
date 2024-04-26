import React from 'react';
import Logo from "../../assets/logo.svg";
import NavMenu from './navMenu';

const LeftSidebar = ({user, signOut, page}) => {
  return (
    <div className="w-64 bg-[#fff6fa] h-full overflow-auto p-4 flex flex-col items-center">
      <img src={Logo} alt="Spread Goodness logo" className="p-4 mb-4"/>
      <div className="flex flex-row mb-8">
        <img src={user.photoURL} alt="Profile Pic" className="w-12 h-12 rounded-full mr-2"></img>
        <div>{user.displayName || user.email}</div>
      </div>
      <NavMenu page={page}/>
      <div className="flex flex-col justify-end h-full">
        <button className="mxy-4 font-bold" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default LeftSidebar;
