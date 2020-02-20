import * as React from "react";
import "./index.css";
import { NoteRow } from "./NoteRow";
import { Control } from "./Control";

const listColumn = ["name", "price", "note"];
const translate = {
  name: "Tên người đóng",
  price: "Số tiền",
  note: "ghi chú"
};

export const NoteBoard: React.SFC<any> = ({ listHistory, date }) => {
  const renderTitle = () => {
    return (
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
  };
  const renderContent = () => {
    return (
      <div className="note-board__list">
        {listHistory.map((item, index) => {
          return <NoteRow key={index} history={item} />;
        })}
      </div>
    );
  };
  return (
    <div className="note-board__container">
      <Control date={date} />
      {renderTitle()}
      {renderContent()}
      <div className="d-flex justify-content-end">Tổng tiền: 10000000</div>
    </div>
  );
};
