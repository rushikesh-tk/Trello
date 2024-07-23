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
  const [showViewModal, setShowViewModal] = useState(false);
  const [todoListData, setTodoListData] = useState([]);
  const [currTodoId, setCurrTodoId] = useState("");
  const [currTodoData, setCurrTodoData] = useState(null);
  const [modalType, setModalType] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const { loading, todoData, error } = useSelector(
    (state) => state.getTodo || {}
  );

  const refreshTodos = () => {
    dispatch(getTodos());
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

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

  const getCurrTodoData = () => {
    const temp = todoData.todos.find((todo) => todo._id === currTodoId);
    setCurrTodoData(temp);
  };

  const handleView = () => {
    setShowViewModal(true);
  };

  useEffect(() => {
    if (currTodoId && todoData?.todos) {
      getCurrTodoData();
    }
  }, [currTodoId, todoData]);

  useEffect(() => {
    if (!showViewModal) {
      setCurrTodoId("");
      setCurrTodoData(null);
    }
  }, [showViewModal]);

  const handleUpdateTodo = (todo) => {
    setCurrTodoData(todo);
    setModalType("UPDATE");
    setShowModal(true);
  };

  const searchTodos = () => {
    if (!searchInput) {
      // If search input is empty, show all todos
      setTodoListData(
        todoData.todos.map((item) => ({ ...item, id: item._id }))
      );
      return;
    }

    const filteredTodos = todoData.todos.filter((todo) => {
      const searchLower = searchInput.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description.toLowerCase().includes(searchLower)
      );
    });

    setTodoListData(filteredTodos.map((item) => ({ ...item, id: item._id })));
  };

  useEffect(() => {
    searchTodos();
  }, [searchInput]);

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
          onClick={() => {
            setModalType("ADD");
            setShowModal(true);
          }}
        />

        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

        <TodoChart
          todoListData={todoListData}
          loading={loading}
          error={error}
          handleView={handleView}
          setCurrTodoId={setCurrTodoId}
          handleUpdateTodo={handleUpdateTodo}
        />

        {showModal && (
          <Modal
            onClose={setShowModal}
            title={modalType === "ADD" ? "Add Task" : "Update Task"}
          >
            <TaskModal
              type={modalType}
              setShowModal={setShowModal}
              refreshTodos={refreshTodos}
              currTodoData={currTodoData}
            />
          </Modal>
        )}

        {showViewModal && currTodoData && (
          <Modal onClose={setShowViewModal} title="Todo details">
            <TaskModal
              type="VIEW"
              setShowModal={setShowViewModal}
              refreshTodos={refreshTodos}
              currTodoData={currTodoData}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Home;
