import React from "react";

const Button = ({ className, buttonText, buttonTextClassName = "", onClick, disabled=false }) => {
  return (
    <button
      className={"w-full flex justify-center items-center " + className}
      onClick={onClick}
      disabled={disabled}
    ><span className={buttonTextClassName}>{buttonText}</span></button>
  );
};

export default Button;
