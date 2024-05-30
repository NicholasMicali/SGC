import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const PromptList = ({
  className,
  title,
  buttonClassName,
  titleClassName,
  staggerIndex,
}) => {
  return (
    <motion.div
      className={twMerge(
        " w-[32%] border-[2.5px] h-full flex flex-col justify-between p-5 rounded-2xl ",
        className
      )}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: staggerIndex * 0.2 }}
    >
      <p className={twMerge("text-[2rem] font-semibold", titleClassName)}>
        {title}
      </p>
      <button
        className={twMerge(
          " text-white self-center w-full p-2 rounded-3xl bg-white font-bold text-xl",
          buttonClassName
        )}
      >
        Check the list
      </button>
    </motion.div>
  );
};

export default PromptList;
