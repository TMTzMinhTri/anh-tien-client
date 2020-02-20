import * as React from "react";
import DatePicker from "react-datepicker";
import { Input, Button, InputGroup, Row, Col } from "reactstrap";
import { HomeScreenContext } from "../..";

export const Control: React.FC<any> = ({ date }) => {
  const { createNewRow } = React.useContext(HomeScreenContext);

  return (
    <Row className="mb-2">
      <Col md={5}>
        {/* <InputGroup>
          <Input type="text" placeholder="Nhập tên người cần tìm" />
          <Button>Tìm</Button>
        </InputGroup> */}
      </Col>
      <Col md={6}>
        <DatePicker selected={date} />
      </Col>
      <Col md={1}>
        <Button color="info" onClick={() => createNewRow()}>
          Tạo mới
        </Button>
      </Col>
    </Row>
  );
};
