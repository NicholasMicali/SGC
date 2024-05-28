import React from "react";
import heartIcon from "../../assets/heart.svg";
import shareIcon from "../../assets/share.svg";
import { Pin, ChevronsRight } from "lucide-react";

const TextCard = ({ loc, date, title, description, name, first, image, stickers }) => {
  return (
    <div
      className={
        !first ?
        "mt-6 flex flex-col justify-between w-[570px] h-fit rounded-lg border-2 relative shadow-lg bg-light-pink gap-3 p-5"
        : "mt-6 flex flex-col justify-between w-[570px] h-fit rounded-lg relative shadow-lg gap-3 p-5 bg-gradient-to-tr from-gradient-light-start via-gradient-light-mid to-gradient-light-end bg-opacity-40"
      }
    >
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
      <div className="flex flex-row justify-between">
        <div className="">
          {description}
        </div>
        {image && <img className="w-20 h-20 ml-2" src={image}></img>}
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
        {stickers &&
          <div className="flex flex-row self-start mt-8 items-center gap-1">
              {stickers.map((sticker) => (
                <img src={sticker} className="w-4 h-4 mr-1"/>
              ))}
          </div>
        }
      </div>
    </div>
  );
};

export default TextCard;
