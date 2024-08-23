// import React from "react";
// import heart from "/auth/blooming_heart.svg";
// import logo from "/SGC_LOGO.svg";
// import { motion } from "framer-motion";

// const BloomingHeart = () => {
//   const num_of_lines = 10;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div className="relative z-10">
//         <img src={heart} alt="blooming heart" />
//         <img
//           src={logo}
//           alt="logo"
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 "
//         />

//       </div>
//     </div>
//   );
// };

// export default BloomingHeart;
import React, { useState, useEffect } from "react";
import heart from "/auth/blooming_heart.svg";
import logo from "/SGC_LOGO.svg";
import { motion } from "framer-motion";

const BloomingHeart = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const numLines = 200; // Adjust as needed
    const newLines = [];
    for (let i = 0; i < numLines; i++) {
      newLines.push({
        angle: (360 / numLines) * i,
        color: getRandomColor(),
        delay: Math.random() * 2, // Random delay for each line
      });
    }
    setLines(newLines);
  }, []);

  const getRandomColor = () => {
    const colors = [
        "#F21C80",
        "#03B5E5",
        "#FFBD21",
        "#95AD2A",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="relative z-10 w-full h-full">
        <img
          src={heart}
          alt="blooming heart"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={logo}
          alt="logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72"
        />
        <svg
          className="absolute top-0 left-0 w-full h-full -z-10"
          viewBox="0 0 1000 1000"
        >
          {lines.map((line, index) => (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke={line.color}
              strokeWidth="2"
              initial={{ pathLength: 0, strokeWidth: 2 }}
              animate={{
                pathLength: 1,
                x2: `${50 + 100 * Math.cos((line.angle * Math.PI) / 180)}%`,
                y2: `${50 + 100 * Math.sin((line.angle * Math.PI) / 180)}%`,
                strokeWidth: 5,
              }}
              transition={{
                duration: 1,
                delay: line.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BloomingHeart;
