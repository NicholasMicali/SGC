import React from "react";
import Button from "../../new componenets/Button";

import Input from "../../new componenets/Input";

const Step2 = ({
  firstName,
  lastName,
  grade,
  setGrade,
  setFirstName,
  setLastName,
  handleNext,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-lg font-bold">We want to know more!</span>
      <Input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className=" border-bold-blue-hover border-2 rounded-lg outline-none"
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className=" border-bold-blue-hover border-2 rounded-lg outline-none"
      />
      <div className="w-[80px] self-start">
        <span className="font-semibold">Grade</span>
        <Input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className=" border-bold-blue-hover border-2 rounded-lg outline-none"
        />
      </div>
      <div className="flex justify-end self-end w-full mt-auto">
        <Button
          onClick={handleNext}
          buttonText={"Next"}
          className={
            "bg-bold-blue px-8 py-1 rounded-lg w-fit text-white font-semibold hover:bg-bold-blue-hover"
          }
        />
      </div>
    </div>
  );
};

export default Step2;
