import React, { useState } from "react";
import { inspirationChecklist } from "../constants/pageConstants";
import { motion } from "framer-motion";
import {animateQuickDownToUpWithDelay} from "../constants/anim";
const InspirationPage = () => {
  // Define your list of items here, each with a checked state
  const [items, setItems] = useState(inspirationChecklist);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="flex-grow flex flex-col items-center overflow-auto p-4">
      <div className="self-start text-[4rem] font-bold">Inspiration Page</div>
      <hr className="w-full border-t-2 border-idle-pink my-4" />
      <style>
        {`
          :root {
            --color-styles-system-grey-light: rgba(241, 245, 249, 1);
            --fff-4f-2: rgba(255, 255, 255, 1);
          }
          .checkbox {
            appearance: none;
            background-color: var(--color-styles-system-grey-light);
            border-radius: 4px;
            height: 30px;
            width: 30px;
            cursor: pointer;
            position: relative;
          }
          .checkbox:checked {
            background-color: var(--color-styles-system-grey-light);
          }
          .checkbox:checked::after {
            content: '✔';
            position: absolute;
            // top: 3px;
            // left: 7px;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            font-size: 22px;
            color: #FD3B8A;
          }
        `}
      </style>
      <div>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            style={item.checked ? { textDecoration: "line-through" } : {}}
            className="flex mb-4"
            {...animateQuickDownToUpWithDelay(index * 0.075)}
          >
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              name={`checkbox-${item.id}`}
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
              className="checkbox"
            />
            <label
              htmlFor={`checkbox-${item.id}`}
              style={{ marginLeft: "8px", fontSize: "20px" }}
            >
              {item.label}
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InspirationPage;
