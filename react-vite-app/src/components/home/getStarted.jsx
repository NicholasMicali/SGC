import React from "react";
import smile from "../../assets/smile.png";
import {animateQuickDownToUpWithDelay} from "../../constants/anim";
import {motion} from "framer-motion";

const GetStarted = ({sizeHeader, handleOpen}) => {
    return(
        <motion.div
            {...animateQuickDownToUpWithDelay(.25)}
        >
            <h1 style={{ fontSize: sizeHeader }} className="font-bold flex flex-col justify-center items-center">
                <span className="my-4 text-center text-base sm:text-xl md:text-2xl lg:text-3xl">Welcome to the Spread Goodness Challenge!</span>
                <img className="w-6/12"src={smile}></img>
                <button onClick={handleOpen} style={{ zIndex: 10 }} className="mb-8 text-xl font-semibold text-white flex flex-col justify-center items-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl py-3 px-5 mt-3 bg-opacity-60">
                    Get started
                </button>
            </h1>

            
        </motion.div>


    );       
} 
export default GetStarted;