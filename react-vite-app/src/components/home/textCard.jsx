import React from "react";

const TextCard = ({ loc, date, title, description, studName }) => {
  return (
    <div className="mt-4 flex flex-col justify-between w-[570px] h-[299px] rounded-lg border-2 bg-pink relative">
      {/* Location at the top left */}
      <div className="absolute top-0 left-0 p-4 font-medium">
        {loc}
        {"  |  "}
        {date}
      </div>

      {/* Title and description centered */}
      <div className="flex flex-col justify-center items-center h-full">
        <h2 className="absolute top-14 transform -translate-y-1/2 left-0 p-4 font-semibold text-xl">
          {title}
        </h2>
        <p className="text-base pt-12 p-4 text-med">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 p-4 font-semibold font-small text-sm">
        {studName}
      </div>
    </div>
  );
};

export default TextCard;