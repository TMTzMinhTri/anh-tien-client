import * as React from "react";
import DatePicker from "react-datepicker";
import { Input, Button, InputGroup, Row, Col } from "reactstrap";
import { HomeScreenContext } from "../..";

export const Control: React.FC<any> = ({ date }) => {
  const { createNewRow } = React.useContext(HomeScreenContext);

  return (
    <Row className="mb-2">
      <Col md={6}>
        <DatePicker
          selected={date}
          onChange={(value: Date) => console.log(new Date(value).toISOString())}
        />
      </Col>
    </Row>
  );
};
