import React from "react";


const CustomInput = ({type, placeholder, value, onChange, id, labelName}) => {
    return (
        <div className="flex flex-col gap-1 w-full mt-3">
            <label htmlFor={id} className="self-start">{labelName}</label>
            <input
            className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
            placeholder={placeholder}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required
            />
        </div>
        
    );
}

export default CustomInput;