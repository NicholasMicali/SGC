import React, { useState } from "react";
import { stickers } from "../../constants/pageConstants";

const Stickers = ({ select }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
        <div className="grid grid-cols-2 gap-2 p-3 rounded-md">
            {stickers.slice(0, 8).map((sticker) => (
                <div
                    key={sticker.value}
                    className="flex items-center hover:bg-white text-sm"
                    onClick={() => select(sticker.imageSrc)}
                >
                <img
                    src={sticker.imageSrc}
                    alt={sticker.label}
                    className="w-6 h-6 mr-2"
                />
                <span>{sticker.label}</span>
                </div>
            ))}
            {stickers.length > 8 && (
                <div
                className="flex items-center justify-center col-span-2 hover:bg-white cursor-pointer p-2 rounded text-sm"
                onClick={() => select(stickers[8].imageSrc)}
                    >
                    <img
                    src={stickers[8].imageSrc}
                    alt={stickers[8].label}
                    className="w-6 h-6 mr-2"
                    />
                    <span>{stickers[8].label}</span>
                </div>
                
            )}
        </div>
    </div>
  );
};

export default Stickers;
