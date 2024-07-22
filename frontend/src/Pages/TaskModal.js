import React from "react";
import Button from "../components/Button";

const TaskModal = (props) => {
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
          className="mt-1 p-2 block w-full border border-gray-900 rounded-md focus:outline-none mb-4 min-h-40 "
          placeholder="Enter description"
        />

        <Button
          text="Save"
          bgColor="blue"
          style={{
            width: "20%",
            float: "right",
          }}
        />
      </div>
    </div>
  );
};

export default TaskModal;
