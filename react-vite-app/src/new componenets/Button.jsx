import React from "react";

const Button = ({ className, buttonText, onClick }) => {
  return (
    <button
      className={"w-full flex justify-center items-center " + className}
      onClick={onClick}
    >{buttonText}</button>
  );
};

export default Button;
