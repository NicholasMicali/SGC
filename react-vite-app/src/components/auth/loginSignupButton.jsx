import React from "react";
import clsx from "clsx";
import {motion} from "framer-motion";

const LoginSignupButton = ({color, colorOnSelect, text, onClick}) => {
    return (
        <motion.button className="w-[48%] rounded-lg p-1"
        initial={{background: color}}
        whileTap={{background: colorOnSelect, scale: 0.9}}
        onClick={onClick}
        >
            {text}
        </motion.button>   
    );
}

export default LoginSignupButton;