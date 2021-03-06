import * as React from "react";
import "./index.css";
import { NoteBoard } from "./NoteBoard";
import {
  payTheMoney,
  getListHistoryByDate,
  getListBorrower
} from "../../Api/Service/borrower";
import { converDate, converDate_DDMMYYY } from "../../utils";
import * as Components from "../../Components";
import { IResponseListUser } from "../../modal/response/listUser";

interface IHomeScreenContext {
  handleUserInput: Function;
  createNewRow: Function;
  changeDate: Function;
  handleUserUpdatePay: Function;
  handleDeleteUserPay: Function;
}

export interface IListHistory {
  id: number;
  name: { value: number; label: string };
  price: number;
  note: string;
}

interface InameConverd {
  value: number;
  label: string;
}

export const HomeScreenContext = React.createContext({} as IHomeScreenContext);

export const HomeScreen: React.SFC<any> = () => {
  const [listUser, setListUser] = React.useState<IResponseListUser[]>([]);

  const { showToast } = Components.useToasts();
  // const { listUser } = React.useContext(LayoutContext);
  const [listHistory, setListHistory] = React.useState<IListHistory[]>([]);
  const [date, setDate] = React.useState(new Date());
  const [users, setUsers] = React.useState<InameConverd[]>([]);

  const [userInput, setUserInput] = React.useState<IListHistory>({
    name: { label: "", value: 0 },
    note: "",
    price: 0,
    id: listHistory.length + 1
  });
  React.useEffect(() => {
    getListBorrower().then(res => setListUser(res.data));
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
  }, [date]);

  React.useEffect(() => {
    if (listUser.length > 0) {
      const ex = listHistory.map(history => {
        return history.name.value;
      });
      const data: InameConverd[] = listUser
        .filter(user => {
          return !ex.includes(user.id);
        })
        .map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      setUsers(data);
    }
  }, [listUser, listHistory]);

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
    [userInput]
  );
  const changeDate = value => {
    setDate(value);
  };
  const handleUserUpdatePay = (index, history, callback: Function) => {
    listHistory[index] = history;
    setListHistory(listHistory);
    showToast();
    callback();
  };
  const handleDeleteUserPay = (index, userInfo: InameConverd) => {
    listHistory.splice(index, 1);
    setUsers([...users, userInfo]);
    setListHistory(listHistory);
    showToast();
  };
  return (
    <HomeScreenContext.Provider
      value={{
        handleUserInput,
        createNewRow,
        changeDate,
        handleUserUpdatePay,
        handleDeleteUserPay
      }}
    >
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
