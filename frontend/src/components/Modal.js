import React from "react";

const Modal = (props) => {
  const { title, onClose, children } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-3 rounded-md shadow-lg relative w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => onClose(false)}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
