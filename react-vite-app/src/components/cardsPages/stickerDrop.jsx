import React, { useState } from "react";
import Gift from "../../assets/Gift.jpg";
import AOS from "../../assets/ActOfService.jpg";
import Time from "../../assets/Time.jpg";
import Earth from "../../assets/Earth.jpg";
import Heart from "../../assets/Heart.jpg";
import Compliment from "../../assets/Compliment.png";
import Cook from "../../assets/Cook.png";
import Surprise from "../../assets/Surprise.png";
import Donation from "../../assets/Donation.png";


function StickerDrop({select}) {
  const [isOpen, setIsOpen] = useState(false);
  const stickers = [
    {
      value: "sticker1",
      label: "Gift",
      imageSrc: Gift
    },
    { value: "sticker2",
      label: "Act of Service",
      imageSrc: AOS,
    },
    { value: "sticker3",
      label: "Volunteer",
      imageSrc: Heart,
    },
    { value: "sticker4",
      label: "Time",
      imageSrc: Time,
    },
    { value: "sticker5",
      label: "Compliment",
      imageSrc: Compliment,
    },
    { value: "sticker6",
      label: "Cook",
      imageSrc: Cook,
    },
    { value: "sticker7",
      label: "Earth",
      imageSrc: Earth,
    },
    { value: "sticker8",
      label: "Surprise",
      imageSrc: Surprise,
    },
    { value: "sticker9",
    label: "Donation",
    imageSrc: Donation,
  }
  ];
  return (
    <div className="flex flex-col gap-1 w-full">
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
}

export default StickerDrop;
