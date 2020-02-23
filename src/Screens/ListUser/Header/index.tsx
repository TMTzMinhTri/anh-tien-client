import * as React from "react";
import { Row, Input, Button, Col, Form, FormGroup, Label } from "reactstrap";
import { ModalCreate } from "../PopupCreateUser";
import "./index.css";
import classnames from "classnames";
interface IProps {
  setOpenModalCreate: Function;
  openModalCreate: boolean;
}

export const Header: React.FC<IProps> = ({
  setOpenModalCreate,
  openModalCreate
}) => {
  const [status, setStatus] = React.useState<boolean>(false);
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
            <Form inline>
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
            </Form>
            <Button color="primary" onClick={() => setOpenModalCreate(true)}>
              Tạo mới
            </Button>
          </Col>
        </Row>
      </div>
      {openModalCreate && (
        <ModalCreate
          openModalCreate={openModalCreate}
          setOpenModalCreate={setOpenModalCreate}
        />
      )}
    </React.Fragment>
  );
};
