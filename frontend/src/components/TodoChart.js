import React, { useState, useEffect } from "react";
import TodoBlock from "./TodoBlock";
import TaskCard from "./TaskCard";
import Drag from "../components/Drag/Drag";
import Loader from "./Loader";

const STATUS_TITLES = ["To Do", "In Progress", "Done"];

const TodoChart = ({ todoListData, loading, error }) => {
  const [todosData, setTodosData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTodosData(todoListData);
  }, [todoListData]);

  useEffect(() => {
    const organizedData = STATUS_TITLES.map((title, index) => ({
      id: index,
      name: title,
      cards: todosData.filter((todo) => todo.status === index),
    }));
    setData(organizedData);
  }, [todosData]);

  const handleDrop = ({ dragItem, dragType, drop }) => {
    if (dragType === "card") {
      let [newListPosition, newCardPosition] = drop
        .split("-")
        .map((string) => parseInt(string));

      let newData = structuredClone(data);

      let oldCardPosition;
      let oldListPosition = data.findIndex((list) => {
        oldCardPosition = list.cards.findIndex((card) => card.id === dragItem);
        return oldCardPosition >= 0;
      });

      let card = data[oldListPosition].cards[oldCardPosition];
      card.status = newListPosition;

      if (
        newListPosition === oldListPosition &&
        oldCardPosition < newCardPosition
      ) {
        newCardPosition--;
      }

      newData[oldListPosition].cards.splice(oldCardPosition, 1);
      newData[newListPosition].cards.splice(newCardPosition, 0, card);

      setData(newData);

      // Update the original todosData state
      setTodosData((prevTodosData) =>
        prevTodosData.map((todo) =>
          todo.id === card.id ? { ...todo, status: newListPosition } : todo
        )
      );
    }
  };

  const handleSave = async () => {
    try {
      console.log(todosData);
      console.log("Save successful:");
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Please try again !!</div>;
  }

  if (data.every((list) => list.cards.length === 0)) {
    return <div>No tasks present, click on Add button to create</div>;
  }

  return (
    <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }) => (
        <Drag.DropZone className="h-full grid sm:grid-cols-3 grid-cols-3">
          {data.map((list, listPosition) => (
            <div key={list.id} className="flex flex-col h-full">
              <TodoBlock name={list.name}>
                {list.cards.map((card, cardPosition) => (
                  <Drag.DropZone
                    key={card.id}
                    dropId={`${listPosition}-${cardPosition}`}
                    dropType="card"
                    remember={true}
                  >
                    <Drag.DropGuide
                      dropId={`${listPosition}-${cardPosition}`}
                      className="rounded-lg bg-gray-300 h-24 m-2"
                      dropType="card"
                    />
                    <Drag.DragItem
                      dragId={card.id}
                      className={`cursor-pointer ${
                        activeItem === card.id &&
                        activeType === "card" &&
                        isDragging
                          ? "hidden"
                          : "translate-x-0"
                      }`}
                      dragType="card"
                    >
                      <TaskCard
                        title={card.title}
                        description={card.description}
                        dragItem={
                          activeItem === card.id && activeType === "card"
                        }
                      />
                    </Drag.DragItem>
                  </Drag.DropZone>
                ))}
                <Drag.DropZone
                  dropId={`${listPosition}-${list.cards.length}`}
                  dropType="card"
                  remember={true}
                >
                  <Drag.DropGuide
                    dropId={`${listPosition}-${list.cards.length}`}
                    className="rounded-lg bg-gray-300 h-24 m-2"
                    dropType="card"
                  />
                </Drag.DropZone>
              </TodoBlock>
              <Drag.DropZone
                dropId={`${listPosition}-${list.cards.length}`}
                className="grow"
                dropType="card"
                remember={true}
              />
            </div>
          ))}
        </Drag.DropZone>
      )}
    </Drag>
  );
};

export default TodoChart;
