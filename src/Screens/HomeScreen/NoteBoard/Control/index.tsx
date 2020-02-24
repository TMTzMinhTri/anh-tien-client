import * as React from "react";
import DatePicker from "react-datepicker";
import { Input, Button, InputGroup, Row, Col } from "reactstrap";
import { HomeScreenContext } from "../..";

export const Control: React.FC<any> = ({ date }) => {
  const { changeDate } = React.useContext(HomeScreenContext);

  return (
    <Row className="mb-2">
      <Col md={6}>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          maxDate={new Date()}
          onChange={(value: Date) => changeDate(value)}
        />
      </Col>
    </Row>
  );
};
