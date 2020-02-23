import * as React from "react";
import "./index.css";
import { NoteBoard } from "./NoteBoard";
import { payTheMoney, getListHistoryByDate } from "../../Api/Service/borrower";
import { LayoutContext } from "../Layout/LayoutContext";
import { converDate, converDate_DDMMYYY } from "../../utils";
import * as Components from "../../Components";
import { Link, NavLink } from "react-router-dom";

interface IHomeScreenContext {
  handleUserInput: Function;
  createNewRow: Function;
}

export interface IListHistory {
  id: number;
  name: { value: number; label: string };
  price: number;
  note: string;
}

export const HomeScreenContext = React.createContext({} as IHomeScreenContext);

export const HomeScreen: React.SFC<any> = () => {
  let mount = false;
  const { showToast } = Components.useToasts();
  const { listUser } = React.useContext(LayoutContext);
  const [listHistory, setListHistory] = React.useState<IListHistory[]>([]);
  const [date, setDate] = React.useState(new Date());
  const [users, setUsers] = React.useState([]);

  const [userInput, setUserInput] = React.useState<IListHistory>({
    name: { label: "", value: 0 },
    note: "",
    price: 0,
    id: listHistory.length + 1
  });
  React.useEffect(() => {
    getListHistoryByDate(converDate(date)).then(rsp => {
      if (rsp.status === true) {
        const data = rsp.data.map(it => {
          return {
            id: it.id,
            name: { value: it.borrower_id.id, label: it.borrower_id.name },
            price: it.total,
            note: it.note
          };
        });
        setListHistory(data);
      }
    });
  }, []);

  React.useEffect(() => {
    mount = true;
    if (listUser.length > 0) {
      const data = listUser
        .map(item => {
          return {
            value: item.id,
            label: item.name
          };
        })
        .filter(value => {
          const ex = listUser.find(it => value.value === it.id);
          return ex;
        });
      setUsers(data);
    }
  }, [listUser]);

  const createNewRow = () => {
    payTheMoney(userInput.name.value, {
      date: converDate(date),
      note: userInput.note,
      total: userInput.price
    }).then(rsp => {
      if (rsp.status === true) {
        setUserInput({
          ...userInput,
          name: { label: "", value: 0 },
          note: "",
          price: 0,
          id: listHistory.length + 1
        });
        showToast();
        setListHistory([userInput, ...listHistory]);
      }
    });
  };

  const handleUserInput = React.useCallback(
    (value, name) => {
      if (name === "price")
        setUserInput({ ...userInput, price: parseInt(value) });
      else setUserInput({ ...userInput, [name]: value });
    },
    [userInput.name, userInput.note, userInput.price]
  );

  return (
    <HomeScreenContext.Provider value={{ handleUserInput, createNewRow }}>
      <div className="note-board-title">
        Sổ ngày: {converDate_DDMMYYY(date)}
      </div>
      <NoteBoard
        listHistory={listHistory}
        date={date}
        userInput={userInput}
        options={users}
      />
    </HomeScreenContext.Provider>
  );
};
