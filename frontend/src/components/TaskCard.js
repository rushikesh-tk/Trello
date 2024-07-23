import React from "react";
import Button from "./Button";
import { deleteTask, getTodos } from "../actions/todoActions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const TaskCard = ({
  dragItem,
  cardData,
  handleView,
  setCurrTodoId,
  handleUpdateTodo,
}) => {
  const { title, description, id } = cardData;
  const dispatch = useDispatch();

  const handleDelete = () => {
    toast
      .promise(dispatch(deleteTask(id)), {
        loading: "Todo deleting...",
        success: "Todo deleted!!",
        error: "Network error",
      })
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => {
        console.log("Error=>", err);
      });
  };

  const saveCurrTodoId = () => {
    setCurrTodoId(id);
    handleView();
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-lg bg-white border border-gray-300 shadow-sm p-5 m-2${
        dragItem ? " rotate-6" : ""
      }`}
    >
      <div className="bg-gray-300 rounded-lg p-3">
        <h3 className="font-bold text-lg my-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h3>
        <p className="overflow-hidden text-ellipsis whitespace-normal max-h-20">
          {description}
        </p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          text="Delete"
          style={{ backgroundColor: "red" }}
          onClick={handleDelete}
        />
        <Button
          text="Edit"
          style={{ backgroundColor: "gray" }}
          onClick={() => handleUpdateTodo(cardData)}
        />
        <Button text="View" bgColor="blue" onClick={saveCurrTodoId} />
      </div>
    </div>
  );
};

export default TaskCard;
