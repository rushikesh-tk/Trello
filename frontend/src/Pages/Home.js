import React from "react";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import TodoChart from "../components/TodoChart";

const Home = () => {
  return (
    <div className="h-screen flex items-start justify-center bg-gray-600">
      <div className="text-3x w-11/12 h-5/6 mt-5">
        <Button
          text="Add Task"
          bgColor="blue"
          style={{
            width: "10rem",
            height: "2rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            margin: "0.5rem",
          }}
        />

        <SearchBar />

        <TodoChart />
      </div>
    </div>
  );
};

export default Home;
