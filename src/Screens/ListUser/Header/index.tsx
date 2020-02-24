import * as React from "react";
import { Row, Input, Button, Col, Form, FormGroup, Label } from "reactstrap";
import { useModal } from "../PopupCreateUser";
import "./index.css";
// import classnames from "classnames";
interface IProps {}

export const Header: React.FC<IProps> = () => {
  const [status, setStatus] = React.useState<boolean>(false);
  const { openModal } = useModal();
  React.useEffect(() => {
    window.addEventListener("scroll", handleEventScroll);
    return () => {
      window.removeEventListener("scroll", handleEventScroll);
    };
  });

  const handleEventScroll = () => {
    if (window.pageYOffset > 50 && status === false) {
      setStatus(true);
    }
    if (window.pageYOffset < 50 && status === true) {
      setStatus(false);
    }
  };
  return (
    <React.Fragment>
      <div
      // className={classnames("header animated", {
      //   slideInDown: status === true,
      //   slideInUp: status === false
      // })}
      >
        <Row>
          <Col md={12} className="d-flex justify-content-lg-between">
            {/* <Form inline>
              <FormGroup>
                <Label for="exampleEmail" hidden>
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form> */}
            <Button color="primary" onClick={() => openModal(true)}>
              Tạo mới
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
