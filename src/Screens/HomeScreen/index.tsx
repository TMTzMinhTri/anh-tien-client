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
  }
];
interface IHomeScreenContext {
  handleUserInput: Function;
  createNewRow: Function;
}

export const HomeScreenContext = React.createContext({} as IHomeScreenContext);

export const HomeScreen: React.SFC<any> = () => {
  const [listHistory, setListHistory] = React.useState(notes);
  const [date, setDate] = React.useState(new Date());

  const createNewRow = () => {
    let product = {
      id: listHistory.length + 1,
      name: "",
      price: 0,
      note: ""
    };
    setListHistory([product, ...listHistory]);
  };

  const handleUserInput = (value, name, id) => {
    let item = {
      id: id,
      name: name,
      value: value
    };
    let products = [...listHistory];
    let newProducts = products.map(function(product) {
      for (let key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    setListHistory(newProducts);
  };

  return (
    <HomeScreenContext.Provider value={{ handleUserInput, createNewRow }}>
      <div className="home-screen">
        <div className="side-bar">
          <ul>
            <li>Sổ ngày</li>
            <li>Sổ cái</li>
            <li>danh sách người mượn</li>
          </ul>
        </div>
        <div className="note-board">
          <div className="note-board-title">Sổ ngày</div>
          <NoteBoard listHistory={listHistory} date={date} />
        </div>
      </div>
    </HomeScreenContext.Provider>
  );
};
