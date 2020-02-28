import * as React from "react";
import "./index.css";
// import { NoteRow } from "./NoteRow";
import { Control } from "./Control";

import Select from "react-select";
import Cleave from "cleave.js/react";
import { Input, Button } from "reactstrap";
import { HomeScreenContext, IListHistory } from "..";
import { formatCurrency } from "../../../utils";
import { updateUserPay } from "../../../Api/Service/borrower";

const listColumn = ["name", "price", "note"];
const translate = {
  name: "Tên người đóng",
  price: "Số tiền",
  note: "ghi chú"
};
interface IProps {
  listHistory: IListHistory[];
  date: Date;
  userInput: IListHistory;
  options: { value: string; label: string }[];
}

export const NoteBoard: React.SFC<IProps> = ({
  listHistory,
  date,
  userInput,
  options
}) => {
  const {
    handleUserInput,
    createNewRow,
    handleUserUpdatePay
  } = React.useContext(HomeScreenContext);
  const [edit, setEdit] = React.useState<{
    history: IListHistory;
    index: number;
  }>(null);

  const renderTitle = (
    <div className="note-board__title ">
      {listColumn.map((column, index) => {
        return (
          <div
            className={index === listColumn.length ? "col-4" : "col-3"}
            key={index}
          >
            {translate[column]}
          </div>
        );
      })}
    </div>
  );

  const handleEdit = (history, index) => {
    setEdit({
      history,
      index
    });
  };
  const handleUserChangeInput = e => {
    const { value, name, rawValue } = e.target;
    console.log(name);
    if (name === "price") {
      setEdit({
        ...edit,
        history: { ...edit.history, price: parseInt(rawValue) }
      });
    } else {
      setEdit({ ...edit, history: { ...edit.history, [name]: value } });
    }
  };

  const handleUpdateUserPay = () => {
    updateUserPay(edit.history).then(rsp => {
      if (rsp.status === true) {
        handleUserUpdatePay(edit.index, rsp.data, () => {
          setEdit(null);
        });
      }
    });
  };

  const renderContent = () => {
    return (
      <div className="note-board__list">
        {listHistory.map((history, index) => {
          return (
            <div className="row m-0 my-3" key={`history_item_${index}`}>
              {edit && edit.index === index ? (
                <React.Fragment>
                  <div className="col-3">{history.name.label}</div>
                  <div className="col-3">
                    <Cleave
                      name="price"
                      value={edit.history.price}
                      className="form-control"
                      placeholder="Nhập số tiền"
                      options={{
                        numeral: true,
                        numeralThousandsGroupStyle: "thousand"
                      }}
                      onChange={e => handleUserChangeInput(e)}
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      value={edit.history.note}
                      name="note"
                      onChange={e => handleUserChangeInput(e)}
                    />
                  </div>
                  <div className="col-2">
                    <Button color="primary" onClick={handleUpdateUserPay}>
                      Lưu
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="col-3">{history.name.label}</div>
                  <div className="col-3">{formatCurrency(history.price)}</div>
                  <div className="col-4">{history.note}</div>
                  <div className="col-2">
                    <Button onClick={() => handleEdit(history, index)}>
                      Edit
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  const renderInputContainer = (
    <div className="note-board-input__container">
      <div className="row m-0 my-3">
        <div className="col-3">
          <Select
            options={options}
            value={userInput.name}
            onChange={value => handleUserInput(value, "name")}
          />
        </div>
        <div className="col-3">
          <Cleave
            name="price"
            value={userInput.price}
            className="form-control"
            placeholder="Nhập số tiền"
            options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand"
            }}
            onChange={e => handleUserInput(e.target.rawValue, e.target.name)}
          />
        </div>
        <div className="col-4">
          <Input
            type="text"
            name="note"
            placeholder="Nhập ghi chú"
            onChange={e => handleUserInput(e.target.value, e.target.name)}
            value={userInput.note}
          />
        </div>
        <div className="col-2">
          <Button color="info" onClick={() => createNewRow()}>
            Tạo mới
          </Button>
        </div>
      </div>
    </div>
  );

  // const total = listHistory.map(item => item.price);
  // const data = total.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // );
  const total = listHistory.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return (
    <div className="note-board__container">
      <Control date={date} />
      {renderTitle}
      {renderInputContainer}
      {renderContent()}
      <div className="d-flex justify-content-end">
        Tổng tiền: {formatCurrency(total)}
      </div>
    </div>
  );
};
