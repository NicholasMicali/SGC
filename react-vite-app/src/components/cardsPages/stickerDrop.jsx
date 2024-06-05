import React, { useState } from "react";
import { stickers } from "../../constants/pageConstants";


const StickerDrop = React.forwardRef(({select}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex flex-col gap-1 w-full" ref={ref}>
      <button
        type="button"
        onClick={(e) => {e.preventDefault; setIsOpen((prev) => !prev);}}
        className="flex items-center justify-between w-full mt-2 bg-pink-100 rounded-3xl border-[1px] p-2 md:p-3"
      >
        <span>Pick stickers! (max 3)</span>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-md">
          {stickers.map((sticker) => (
            <div key={sticker.value} className="flex items-center hover:bg-white" onClick={() => select(sticker.imageSrc)}>
              <img
                src={sticker.imageSrc}
                alt={sticker.label}
                className="w-6 h-6 mr-2"
              />
              <span>{sticker.label}</span>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
})

export default StickerDrop;
