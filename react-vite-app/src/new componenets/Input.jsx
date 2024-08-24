import React from "react";

const Input = ({
  placeholder,
  className,
  value,
  onChange,
  type,
  required = true,
  minLength = 1,
  maxLength = 100,
}) => {
  return (
    <input
      placeholder={placeholder}
      className={`w-full p-2 flex items-center justify-center text-center ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

export default Input;
