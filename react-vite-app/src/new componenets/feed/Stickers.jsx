import React, { useState } from "react";
import { stickers } from "../../constants/pageConstants";

const Stickers = ({ select }) => {
    const [selectedStickers, setSelectedStickers] = useState([])
    const [error, setError] = useState("");

    const handleSelect = (sticker) => {
        if (selectedStickers.includes(sticker.value)) {
          // Deselect the sticker
          const updatedSelected = selectedStickers.filter(
            (s) => s !== sticker.value
          );
          setSelectedStickers(updatedSelected);
          setError("");
          // Notify parent with updated selection
          select(
            updatedSelected
              .map((val) => stickers.find((s) => s.value === val)?.imageSrc)
              .filter((src) => src !== undefined)
          );
        } else {
          if (selectedStickers.length >= 3) {
            // Set error message instead of alert for better UX
            setError("You can only select up to 3 stickers.");
            return;
          }
          // Select the sticker
          const updatedSelected = [...selectedStickers, sticker.value];
          setSelectedStickers(updatedSelected);
          setError("");
          // Notify parent with updated selection
          select(
            updatedSelected
              .map((val) => stickers.find((s) => s.value === val)?.imageSrc)
              .filter((src) => src !== undefined)
          );
        }
      };

    const firstEightStickers = stickers.slice(0, 8);
    const lastSticker = stickers.length > 8 ? stickers[8] : null;

  return (
    <div className="flex flex-col gap-1 w-full">
        <div className="grid grid-cols-2 gap-2 p-3 rounded-md">
            {firstEightStickers.map((sticker) => (
                <button
                    key={sticker.value}
                    className={`flex items-center hover:bg-pink-100 text-sm rounded-xl p-1 cursor-pointer border ${
                    selectedStickers.includes(sticker.value)
                        ? "bg-pink-200 border-pink-400"
                        : "border-pink-400"
                    } ${
                        selectedStickers.length >= 3 && !selectedStickers.includes(sticker.value)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    
                    onClick={() => handleSelect(sticker)}
                    aria-pressed={selectedStickers.includes(sticker.value)}
                    disabled={selectedStickers.length >= 3 && !selectedStickers.includes(sticker.value)}
                >
                    <img
                        src={sticker.imageSrc}
                        alt={sticker.label}
                        className="w-6 h-6 mr-2"
                    />
                    <span>{sticker.label}</span>
                </button>
            ))}
            {lastSticker && (
                <button
                    className={`flex items-center justify-center col-span-2 hover:bg-pink-100 text-sm p-2 rounded cursor-pointer border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    selectedStickers.includes(lastSticker.value)
                        ? "bg-pink-200 border-pink-400"
                        : "border-transparent"
                    } ${
                    selectedStickers.length >= 3 && !selectedStickers.includes(lastSticker.value)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleSelect(lastSticker)}
                    aria-pressed={selectedStickers.includes(lastSticker.value)}
                    disabled={selectedStickers.length >= 3 && !selectedStickers.includes(lastSticker.value)}
                >
                    <img
                    src={lastSticker.imageSrc}
                    alt={lastSticker.label}
                    className="w-6 h-6 mr-2"
                    />
                    <span>{lastSticker.label}</span>
              </button>
                
            )}
        </div>
    </div>
  );
};

export default Stickers;
