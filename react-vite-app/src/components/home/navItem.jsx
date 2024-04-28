import React from "react";

const NavItem = ({icon, text, page, onClick}) => {
    return(<div className="flex flex-row justify-center items-center">
    <img className={page === text ? "mr-2 stroke-pink-500" : 'mr-2'} src={icon} alt="Feed Icon" />
    <button onClick={onClick} className={page === text ? "font-extrabold text-pink-500" : ''}>
      {text}
    </button>
  </div>)
}

export default NavItem;