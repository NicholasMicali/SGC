import React from "react";


const CustomInput = React.forwardRef(({type, placeholder, value, onChange, id, labelName, pattern},ref) => {
    return (
        <div className="flex flex-col gap-1 w-full mt-3" ref={ref}>
            <label htmlFor={id} className="self-start">{labelName}</label>
            <input
            className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
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
})

export default CustomInput;