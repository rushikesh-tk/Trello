import React from "react";

const InputField = (props) => {
  const { label, inputType, placeholder, id, style, onChange, value } = props;

  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        className="mt-1 p-2 block w-full border rounded-md focus:outline-none mb-4"
        placeholder={placeholder}
        style={style}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
