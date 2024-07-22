import React from "react";
import Loader from "./Loader";

const Button = (props) => {
  const { text, bgColor, style, onClick, loading } = props;

  return (
    <button
      type="button"
      className={`w-full flex items-center justify-center font-semibold bg-${bgColor}-500 text-white p-2 rounded-md hover:bg-${bgColor}-600`}
      style={{ ...style, minHeight: "2.5rem" }} // Ensure consistent height
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader />
      ) : (
        <span className="inline-flex items-center">{text}</span>
      )}
    </button>
  );
};

export default Button;
