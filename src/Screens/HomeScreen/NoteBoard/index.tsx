import * as React from "react";
import "./index.css";
// import { NoteRow } from "./NoteRow";
// import { Control } from "./Control";

import Select from "react-select";
import Cleave from "cleave.js/react";
import { Input, Button } from "reactstrap";
import { HomeScreenContext, IListHistory } from "..";
import { formatCurrency } from "../../../utils";

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
  const { handleUserInput, createNewRow } = React.useContext(HomeScreenContext);

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

  const renderContent = () => {
    return (
      <div className="note-board__list">
        {listHistory.map((history, index) => {
          return (
            <div className="row m-0 my-3" key={`history_item_${index}`}>
              <div className="col-3">{history.name.label}</div>
              <div className="col-3">{formatCurrency(history.price)}</div>
              <div className="col-4">{history.note}</div>
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

  return (
    <div className="note-board__container">
      {/* <Control date={date} /> */}
      {renderTitle}
      {renderInputContainer}
      {renderContent()}
      <div className="d-flex justify-content-end">Tổng tiền: 10000000</div>
    </div>
  );
};
