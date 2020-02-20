import * as React from "react";
import Select from "react-select";
import Cleave from "cleave.js/react";
import { Input, Button } from "reactstrap";
import { HomeScreenContext } from "../..";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
export const NoteRow: React.SFC<any> = ({ history }) => {
  const { handleUserInput } = React.useContext(HomeScreenContext);
  return (
    <div className="row m-0 my-3">
      <div className="col-3">
        <Select
          options={options}
          defaultValue={options[0].label}
          onChange={value => handleUserInput(value, "username",history.id)}
        />
      </div>
      <div className="col-3">
        <Cleave
          name="price"
          value={history.price}
          className="form-control"
          placeholder="Nhập số tiền"
          id={history.id}
          options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
          onChange={e => handleUserInput(e.target.value, e.target.name, e.target.id)}
        />
      </div>
      <div className="col-4">
        <Input
          type="text"
          name="note"
          id={history.id}
          placeholder="Nhập ghi chú"
          onChange={e => handleUserInput(e.target.value, e.target.name,e.target.id)}
          value={history.note}
        />
      </div>
      <div className="col-2">
        <Button color="success">Lưu</Button>
      </div>
    </div>
  );
};
