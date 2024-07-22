import React from "react";

const Button = (props) => {
  const { text, bgColor, style, onClick } = props;

  return (
    <button
      type="button"
      className={`w-full flex items-center justify-center font-semibold bg-${bgColor}-500 text-white p-2 rounded-md hover:bg-${bgColor}-600`}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
