import React, { useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../actions/todoActions";
import toast from "react-hot-toast";

const STATUS_TITLES = ["To Do", "In Progress", "Done"];

const TaskModal = ({ setShowModal, refreshTodos }) => {
  const dispatch = useDispatch();
  const createTodo = useSelector((state) => state.createTodo);
  const { loading, error } = createTodo;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTodo = async () => {
    if (!title) {
      toast.error("Please enter title");
      return;
    }
    if (!description) {
      toast.error("Please enter description");
      return;
    }

    if (!status) {
      toast.error("Please select status");
      return;
    }

    toast
      .promise(dispatch(addTodo(title, description, parseInt(status))), {
        loading: "Adding...",
        success: "Todo Added!!",
        error: error ? error : "Network error",
      })
      .then(() => {
        setShowModal(false);
        refreshTodos();
      })
      .catch((err) => {
        setShowModal(false);
        console.log("Error=>", err);
      });
  };

  return (
    <div>
      <div>
        <label
          htmlFor="Title"
          className="block text-sm font-medium text-gray-500"
        >
          Title
        </label>
        <input
          type="text"
          id="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-900 rounded-md focus:outline-none mb-4"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-500"
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-900 rounded-md focus:outline-none mb-4 min-h-40"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-500"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-900 rounded-md focus:outline-none mb-4"
        >
          <option value="" disabled>
            Select status
          </option>
          {STATUS_TITLES.map((title, index) => (
            <option key={index} value={index}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <Button
        text="Save"
        bgColor="blue"
        style={{
          width: "20%",
          float: "right",
        }}
        onClick={handleAddTodo}
        loading={loading}
      />
    </div>
  );
};

export default TaskModal;
