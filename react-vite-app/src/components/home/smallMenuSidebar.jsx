import React, { useEffect, useState } from "react";
import NavMenu from "./navMenu";

const SmallMenuSidebar = ({ user, signOut, page }) => {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col items-center">
      <NavMenu page={page} />
      <div className="flex flex-col justify-end h-full">
        <button className="m-4 font-bold" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SmallMenuSidebar;