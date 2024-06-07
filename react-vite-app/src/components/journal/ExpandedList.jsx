import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
const ExpandedList = ({
  layoutId,
  onClick,
  divClassName,
  buttonClassName,
  prompts,
  titleClassName,
  title
}) => {
  return (
    <motion.div
      className={twMerge(
        "justify-between border-[2.5px] min-h-fit flex flex-col p-5 rounded-2xl absolute left-0 right-0 top-0 bottom-0 m-auto w-1/2 max-md:w-3/4 max-sm:w-[94%] gap-4 ",
        divClassName
      )}
      layoutId={layoutId}
    >
      <p className={twMerge("text-[2rem] font-semibold", titleClassName)}>
        {title}
      </p>
      <div className="flex flex-col gap-4 justify-start h-full">
        {prompts.map((prompt, index) => (
          <div key={index} className="text-lg">
            <span className="font-semibold">{index + 1})</span> {prompt}
          </div>
        ))}
      </div>
      <button
        className={twMerge(
          "w-full p-2 rounded-3xl bg-white font-bold text-xl ",
          buttonClassName
        )}
        onClick={onClick}
      >
        Take me back
      </button>
    </motion.div>
  );
};

export default ExpandedList;
