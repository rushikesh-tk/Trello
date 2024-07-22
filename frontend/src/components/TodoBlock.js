import React from "react";

const TodoBlock = (props) => {
  const { name, children } = props;
  return (
    <div className="bg-gray-600 rounded-lg flex flex-col max-h-[32rem]">
      <div className="bg-blue-500 p-2 m-2 rounded-md text-white font-bold hover:bg-blue-600">
        {name}
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar p-2 rounded-b-lg">
        {children}
      </div>
    </div>
  );
};

export default TodoBlock;
