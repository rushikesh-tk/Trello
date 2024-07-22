import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import TodoChart from "../components/TodoChart";
import Modal from "../components/Modal";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../actions/todoActions";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [todoListData, setTodoListData] = useState([]);

  const dispatch = useDispatch();

  const { loading, todoData, error } = useSelector((state) => state.getTodo);

  const refreshTodos = () => {
    dispatch(getTodos());
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  useEffect(() => {
    if (todoData?.todos && todoData?.todos.length > 0) {
      const temp = todoData.todos.map((item) => {
        let tempTodo = { ...item, id: item._id };
        return tempTodo;
      });
      setTodoListData(temp);
    } else {
      setTodoListData([]);
    }
  }, [todoData]);

  return (
    <div className="h-full flex items-start justify-center bg-gray-600">
      <div className="text-3x w-11/12 h-5/6 mt-5">
        <Button
          text="Add Task"
          bgColor="blue"
          style={{
            width: "10rem",
            height: "2rem",
            fontSize: "1rem",
            marginBottom: "1.2rem",
            margin: "0.5rem",
          }}
          onClick={() => setShowModal(true)}
        />

        <SearchBar />

        <TodoChart
          todoListData={todoListData}
          loading={loading}
          error={error}
        />

        {showModal && (
          <Modal onClose={setShowModal} title="Add Task">
            <TaskModal
              setShowModal={setShowModal}
              refreshTodos={refreshTodos}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Home;
