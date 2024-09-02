import React from "react";

const Button = ({ className, buttonText, onClick, disabled=false }) => {
  return (
    <button
      className={"w-full flex justify-center items-center " + className}
      onClick={onClick}
      disabled={disabled}
    >{buttonText}</button>
  );
};

export default Button;
