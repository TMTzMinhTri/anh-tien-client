import * as React from "react";
import "./index.css";
import { NoteBoard } from "./NoteBoard";

const notes = [
  {
    id: 1,
    name: "football",
    price: 2000000,
    note: "test"
  },
  {
    id: 2,
    name: "baseball",
    price: 2000000,
    note: "test"
  },
  {
    id: 3,
    name: "basketball",
    price: 2000000,
    note: "test"
  },
  {
    id: 4,
    name: "iPod Touch",
    price: 2000000,
    note: "test"
  },
  {
    id: 5,
    name: "iPhone 5",
    price: 2000000,
    note: "test"
  },
  {
    id: 6,
    name: "nexus 7",
    price: 2000000,
    note: "test"
  }
];

export const HomeScreen: React.SFC<any> = () => {
  const [listHistory, setListHistory] = React.useState(notes);

  const createNewRow = () => {
    let product = {
      id: listHistory.length + 1,
      name: "",
      price: 0,
      note: ""
    };
    setListHistory([...listHistory, product]);
  };

  return (
    <div className="home-screen">
      <div className="side-bar">
        <ul>
          <li>asdasd</li>
        </ul>
      </div>
      <div className="note-board">
        <button onClick={createNewRow}>Add</button>
        <NoteBoard listHistory={listHistory} />
      </div>
    </div>
  );
};
