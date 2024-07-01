import React, { useState } from "react";
import { motion} from "framer-motion";

const CardsButton = ({
  height,
  width,
  text,
  borderColor,
  textColor,
  backgroundColor,
  onClick,
  icon,
  staticStyle,
  type
}) => {
  const [isHovered, setHovered] = useState(false);

  if (staticStyle) {
    return (
      <button
        className="w-[180px] h-[51.75px] rounded-lg border-[2px] flex justify-center items-center px-4"
        onClick={onClick}
        type={type ? type : "button"}
        style={{
          height: height,
          width: width,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        }}
      >
        <span
          style={{
            color: textColor,
            fontSize: "18px",
            fontFamily: "sans-serif",
            marginRight: icon ? "8px" : "0",
          }}
        >
          {text}
        </span>
      </button>
    );
  }
  
  return (
    <motion.button
      className="w-[180px] h-[51.75px] rounded-lg border-[2px] flex justify-center items-center px-4"
      onClick={onClick}
      style={{
        height: height,
        width: width,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          color: textColor,
          fontSize: "18px",
          fontFamily: "sans-serif",
          marginRight: icon ? "8px" : "0",
        }}
      >
        {text}
      </span>
      {icon && (
        <img
          src={icon}
          alt={`${text} icon`}
          className="icon-class"
          style={{ width: "20px", height: "20px" }}
        />
      )}
      {isHovered &&
        Array.from({ length: 15 }).map((_, index) => (
          <motion.img
            key={index}
            src={icon} // replace with your icon source
            alt="Icon"
            className={`absolute`}
            initial={{
              opacity: 1,
              y: 10 * Math.random(),
              x: 100 * Math.random(),
            }}
            animate={{
              y: -100 * Math.random(),
              x: 100 * (Math.random() - 0.2),
              sclae: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.7 }}
          />
        ))}
    </motion.button>
  );
};

export default CardsButton;
