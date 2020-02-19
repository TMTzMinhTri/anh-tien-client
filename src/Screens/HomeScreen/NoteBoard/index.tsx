import * as React from "react";
import "./index.css";
import { NoteRow } from "./NoteRow";

interface IProps {}

const listColumn = ["name", "price", "note"];
const translate = {
    name: "Họ và tên",
    price: "Số tiền đã đóng",
    note: "ghi chú"
}

export const NoteBoard: React.SFC<any> = ({ listHistory }) => {
  const renderTitle = () => {
    return (
      <div className="note-board__title ">
        {listColumn.map((column, index) => {
          return (
            <div className="col-4" key={index}>
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
      {renderTitle()}
      {renderContent()}
    </div>
  );
};
