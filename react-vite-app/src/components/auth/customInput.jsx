import React from "react";

const CustomInput = ({className, type, placeholder, value, onChange, id, labelName, pattern}) => {
    return (
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={id} className="self-start">{labelName}</label>
            <input
            className={`rounded-lg shadow-lg max-sm:w-[85%] w-[316px] h-[48px] p-4 bg-[#E9E5E7] text-sm text-[#97A2A7] border-none focus:outline-none ${className}`}
            placeholder={placeholder}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            pattern={pattern}
            required
            />
        </div>
        
    );
}

export default CustomInput;