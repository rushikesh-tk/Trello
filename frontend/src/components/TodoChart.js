import React, { useState } from "react";
import TodoBlock from "./TodoBlock";
import TaskCard from "./TaskCard";
import Drag from "../components/Drag/Drag";

const dummyData = [
  {
    id: 1,
    name: "List 1",
    cards: [
      { id: 1, title: "Card 1" },
      { id: 2, title: "Card 2" },
      { id: 3, title: "Card 3" },
      { id: 4, title: "Card 4" },
      { id: 5, title: "Card 5" },
    ],
  },
  {
    id: 2,
    name: "List 2",
    cards: [
      { id: 6, title: "Card 6" },
      { id: 7, title: "Card 7" },
      { id: 8, title: "Card 8" },
    ],
  },
  {
    id: 3,
    name: "List 3",
    cards: [
      { id: 9, title: "Card 9" },
      { id: 10, title: "Card 10" },
      { id: 11, title: "Card 11" },
    ],
  },
];

const TodoChart = () => {
  const [data, setData] = useState(dummyData);

  const handleDrop = ({ dragItem, dragType, drop }) => {
    if (dragType === "card") {
      // get the drop position as numbers
      let [newListPosition, newCardPosition] = drop
        .split("-")
        .map((string) => parseInt(string));
      // create a copy for the new data
      let newData = structuredClone(data); // deep clone
      // find the current positions
      let oldCardPosition;
      let oldListPosition = data.findIndex((list) => {
        oldCardPosition = list.cards.findIndex((card) => card.id === dragItem);
        return oldCardPosition >= 0;
      });
      // get the card
      let card = data[oldListPosition].cards[oldCardPosition];
      // if same array and current position before drop reduce drop position by one
      if (
        newListPosition === oldListPosition &&
        oldCardPosition < newCardPosition
      ) {
        newCardPosition--; // reduce by one
      }
      // remove the card from the old position
      newData[oldListPosition].cards.splice(oldCardPosition, 1);
      // put it in the new position
      newData[newListPosition].cards.splice(newCardPosition, 0, card);
      // update the state
      setData(newData);
    }
  };

  return (
    <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }) => (
        <Drag.DropZone className="h-full grid sm:grid-cols-3 grid-cols-3">
          {data.map((list, listPosition) => {
            return (
              <div key={list.id} className="flex flex-col h-full">
                <TodoBlock name={list.name}>
                  {data[listPosition].cards.map((card, cardPosition) => {
                    return (
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
                            dragItem={
                              activeItem === card.id && activeType === "card"
                            }
                          />
                        </Drag.DragItem>
                      </Drag.DropZone>
                    );
                  })}
                  <Drag.DropZone
                    dropId={`${listPosition}-${data[listPosition].cards.length}`}
                    dropType="card"
                    remember={true}
                  >
                    <Drag.DropGuide
                      dropId={`${listPosition}-${data[listPosition].cards.length}`}
                      className="rounded-lg bg-gray-300 h-24 m-2"
                      dropType="card"
                    />
                  </Drag.DropZone>
                </TodoBlock>
                <Drag.DropZone
                  dropId={`${listPosition}-${data[listPosition].cards.length}`}
                  className="grow"
                  dropType="card"
                  remember={true}
                />
              </div>
            );
          })}
        </Drag.DropZone>
      )}
    </Drag>
  );
};

export default TodoChart;
