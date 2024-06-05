import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const PromptList = ({
  className,
  title,
  buttonClassName,
  titleClassName,
  staggerIndex,
  layoutId,
  onClick,
  disabled,
}) => {
  return (
    <motion.div
      className={twMerge(
        " w-[32%] border-[2.5px] h-full flex flex-col justify-between p-5 rounded-2xl ",
        className
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: staggerIndex * 0.05 }}
      layoutId = {layoutId}
    >
      <p className={twMerge("text-[2rem] font-semibold", titleClassName)}>
        {title}
      </p>
      <button
        className={twMerge(
          "self-center w-full p-2 rounded-3xl bg-white font-bold text-xl",
          buttonClassName
        )}
        onClick={onClick}
        disabled={disabled === 0 || disabled}
      >
        Check the list
      </button>
    </motion.div>
  );
};

export default PromptList;
