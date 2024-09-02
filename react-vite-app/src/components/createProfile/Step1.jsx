import React from "react";
import { createProfileRoleButton } from "../../constants/pageConstants.js";
import Button from "../../new componenets/Button.jsx";

const Step1 = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center gap-4 mx-5 max-md:mb-10">
      <div className="w-full py-2">
        <h3 className="text-lg font-semibold text-start max-md:text-center">
          Who are you?
        </h3>
        <p className="text-sm text-start font-semibold max-md:hidden mt-2">
          Please identify your log in
        </p>
      </div>

      <div className="flex max-md:flex-col justify-center gap-4">
        {createProfileRoleButton.map((button, index) => (
          <Button
            key={index}
            buttonText={button.text}
            className={` ${button.bg_color} text-white p-3 rounded-full font-semibold px-20 hover:${button.hover} md:rounded-2xl md:px-8`}
            onClick={() => {
              onClick(button.role);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Step1;
