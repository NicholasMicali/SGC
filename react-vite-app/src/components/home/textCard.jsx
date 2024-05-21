import React from "react";
import heartIcon from "../../assets/heart.svg";
import shareIcon from "../../assets/share.svg";
import { Pin, ChevronsRight } from "lucide-react";

const TextCard = ({ loc, date, title, description, name, first }) => {
  return (
    <div
      className={
        !first ?
        "mt-6 flex flex-col justify-between w-[570px] h-fit rounded-lg border-2 relative shadow-lg bg-light-pink gap-3 p-5"
        : "mt-6 flex flex-col justify-between w-[570px] h-fit rounded-lg relative shadow-lg gap-3 p-5 bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end bg-opacity-40"
      }
    >
      {/* Location at the top left */}
      {/* <div className="absolute top-0 left-0 p-4 font-medium">
        {loc}
        {"  |  "}
        {date}
      </div> */}

      {/* Title and description centered */}
      {/* <div className="flex flex-col justify-center items-center h-full">
        <h2 className="absolute top-14 transform -translate-y-1/2 left-0 p-4 font-semibold text-xl">
          {title}
        </h2>
        <p className="text-base pt-12 p-4 text-med">{description}</p>
      </div> */}

      {/* <div
        className="absolute bottom-0 left-0 m-3 p-1 font-small text-sm"
        style={{ borderRadius: "5px", backgroundColor: "aqua" }}
      >
        {name}
      </div> */}
      {/* top row */}
      <div className="flex justify-between">
        <div className="flex items-center">
          📍
          <span className=" font-bold">{loc}</span>
          &nbsp;
          &nbsp;
          {"|"}
          &nbsp;
          &nbsp;
          <span className=" text-normal">{date}</span>
        </div>
        <div className="flex gap-3">
          <img src={shareIcon} width={20} height={20} />
          <img src={heartIcon} width={20} height={20} />
        </div>
      </div>

      {/* title */}
      <div className=" font-bold text-lg">
        {title}
      </div>
      
      {/* description */}
      <div className="">
        {description}
      </div>

      {/* see more button */}
      <div className=" font-semibold cursor-pointer text-lg flex items-center">
        See More
        <ChevronsRight size={25} className="ml-2" />
      </div>

      {/* bottom row: name and emojis */}
      <div className="flex justify-between ">
        <div className="flex items-center">
          {name}
          &nbsp;
          |
          &nbsp;
          <div className=" text-sm font-semibold bg-blue-200 pl-[5px] pr-[5px] rounded-md">
            Student
          </div>
        </div>
        <div>
          🐔🐼🐸
        </div>
      </div>
    </div>
  );
};

export default TextCard;
