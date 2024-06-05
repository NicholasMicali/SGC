import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
const ExpandedList = ({ layoutId, onClick, divClassName, buttonClassName, prompts }) => {
  return (
    <motion.div
      className={twMerge(
        "border-[2.5px] h-3/4 flex flex-col justify-between p-5 rounded-2xl absolute w-1/2 max-md:w-3/4 max-sm:w-[94%] ",
        divClassName
      )}
      layoutId={layoutId}
    >
        <div className="flex flex-col gap-4">
            {prompts.map((prompt, index) => (
            <div key={index} className="text-lg"><span className="font-semibold">{index + 1})</span> {prompt}</div>
            ))}
        </div>
      <button
        className={twMerge(
          "self-center w-full p-2 rounded-3xl bg-white font-bold text-xl",
          buttonClassName
        )}
        onClick={onClick}
      >
        take me back
      </button>
    </motion.div>
  );
};

export default ExpandedList;
