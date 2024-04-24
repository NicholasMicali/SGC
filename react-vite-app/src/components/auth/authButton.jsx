import React from "react";
import { motion } from "framer-motion";


const AuthButton = ({ text, disabled }) => {
    return  <motion.button
    type="submit"
    disabled={disabled}
    className="  bg-gradient-to-tr rounded-xl p-2 md:text-xl md:font-semibold text-white from-gradient-start via-gradient-mid to-gradient-end md:w-[110%] w-full md:mt-8"
    whileTap={{ scale: 0.9 }}>
    {text}
  </motion.button>
}

export default AuthButton;