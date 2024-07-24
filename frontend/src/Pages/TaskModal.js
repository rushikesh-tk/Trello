import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../actions/todoActions";
import toast from "react-hot-toast";

const STATUS_TITLES = ["To Do", "In Progress", "Done"];

const TaskModal = ({ setShowModal, refreshTodos, type, currTodoData }) => {
  const dispatch = useDispatch();
  const createTodo = useSelector((state) => state.createTodo);
  const { loading, error } = createTodo;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (type !== "ADD" && currTodoData) {
      setTitle(currTodoData.title);
      setDescription(currTodoData.description);
      setStatus(currTodoData.status);
      setCreatedAt(currTodoData.createdAt);
      setUpdatedAt(currTodoData.updatedAt);
    }
  }, [type, currTodoData]);

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
        error: error ? error : "Something went wrong, please try again :)",
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

  const handleUpdateTodo = async () => {
    if (!title) {
      toast.error("Please enter title");
      return;
    }
    if (!description) {
      toast.error("Please enter description");
      return;
    }

    const updatedTodo = { ...currTodoData, title, description, status };

    toast
      .promise(
        dispatch(
          updateTodo(
            updatedTodo._id,
            updatedTodo.title,
            updatedTodo.description,
            updatedTodo.status
          )
        ),
        {
          loading: "Updating...",
          success: "Todo Updated!!",
          error: error ? error : "Something went wrong, please try again :)",
        }
      )
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
      {type === "VIEW" ? (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Title
            </label>
            <p className="mt-1 p-2 block w-full border border-gray-900 rounded-md mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Description
            </label>
            <p className="mt-1 p-2 block w-full border border-gray-900 rounded-md mb-4 whitespace-normal break-words">
              {description}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Status
            </label>
            <p className="mt-1 p-2 block w-full border border-gray-900 rounded-md mb-4">
              {STATUS_TITLES[status]}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Created At
            </label>
            <p className="mt-1 p-2 block w-full border border-gray-900 rounded-md mb-4">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Updated At
            </label>
            <p className="mt-1 p-2 block w-full border border-gray-900 rounded-md mb-4">
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
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
            text={type === "ADD" ? "Save" : "Update"}
            bgColor="blue"
            style={{ width: "20%", float: "right" }}
            onClick={type === "ADD" ? handleAddTodo : handleUpdateTodo}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default TaskModal;
