import React from "react";


const NoPosts = ({ height, width, textTop, textBottom, borderColor, textColorTop, textColorBottom, backgroundColor, onClick, icon }) => {
  return (
    <div 
    className = "mt-4 border-0 rounded-xl overflow-hidden"
    style={{
        height: height,
        width: width,
        background: borderColor,
        backgroundColor: backgroundColor,
        padding: '4px'
    }}
    >
        <div
            className="flex flex-col justify-start w-full h-full rounded-xl"
            style={{
            backgroundColor: backgroundColor,
            overflow: 'hidden'
            }}
        >
            <span className = "mb-2 self-center font-bold"
                style={{
                    color: textColorTop, 
                    fontSize: '28px', 
                    fontFamily: 'sans-serif', 
                    marginRight: icon ? '8px' : '0',
                    }}>
                {textTop}
            </span>
            <button
            className="mb-2 border-0 flex justify-center self-center rounded-xl"
            onClick={onClick}
            style={{
                width: "175px", 
                height: "175px",
                borderColor: borderColor,
                backgroundColor: backgroundColor
            }}
            >
            {icon && <img src={icon} alt={`${textTop} icon`} className="icon-class" style={{ width: "100%", height: "100%" }} />}
            {/* maybe use a different post icon */}
            </button>
            <span className = "self-center font-bold"
                style={{
                    color: textColorBottom, 
                    fontSize: '36px', 
                    fontFamily: 'sans-serif', 
                    marginRight: icon ? '8px' : '0',
                    }}>
                {textBottom}
            </span>
        </div>    
    </div>
  );
};


export default NoPosts;