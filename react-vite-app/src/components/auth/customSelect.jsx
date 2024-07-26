import React from "react";

const CustomSelect = ({ id, value, onChange, labelName, options }) => {
  return (
    <div className="flex flex-col gap-1 w-full mt-3">
      <label htmlFor={id} className="self-start">{labelName}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
        required
      >
        <option value="" disabled>Select your grade</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;