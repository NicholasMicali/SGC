import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const LoginSignupButton = ({ color, borderColor, text, onClick, current }) => {
  return (
    <motion.button
      className={twMerge(
        `w-[48%] rounded-2xl p-2`,
        clsx(
          { "inner-border-2": borderColor },
          { "inner-border-solid": borderColor },
          { "inner-border-[#fd4f96]": borderColor === "#fd4f96" },
          { "inner-border-[#48b8e6]": borderColor === "#48b8e6" }
        )
      )}
      initial={{
        background: color,
      }}
      whileTap={{ scale: 0.9 }}
      onClick={current !== text ? onClick : null}
    >
      {text}
    </motion.button>
  );
};

export default LoginSignupButton;
