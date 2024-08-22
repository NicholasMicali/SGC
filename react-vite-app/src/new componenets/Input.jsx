import React from "react";

const Input = ({ placeholder, className, value, onChange, type }) => {
  return (
    <input
      placeholder={placeholder}
      className={`w-full p-2 flex items-center justify-center text-center ${className}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
