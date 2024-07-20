import React from "react";

const TaskCard = (props) => {
  const { title, description = "Drag and drop me!", dragItem } = props;

  return (
    <div
      className={`rounded-lg bg-white border border-gray-300 shadow-sm p-5 m-2${
        dragItem ? " rotate-6" : ""
      }`}
    >
      <h3 className="font-bold text-lg my-1">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default TaskCard;
