import * as React from "react";
import { useParams } from "react-router-dom";
import { getDetailBorrower, payTheMoney } from "../../Api/Service/borrower";
import { IResponseListUser } from "../../modal/response/listUser";
import {
  Spinner,
  Container,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./index.css";
import { formatCurrency, converDate } from "../../utils";
import { PageContentEmpty } from "./Empty";
import Cleave from "cleave.js/react";

export const DetailsUserScreen: React.FC<{}> = () => {
  let { userid } = useParams();
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<IResponseListUser>(null);
  const [userInput, setUserInput] = React.useState<{
    total: number;
    note: string;
  }>({ total: 0, note: "" });

  React.useEffect(() => {
    getDetailBorrower(userid).then(res => {
      setUserInfo(res.data);
    });
  }, [userid]);
  const handlePayTheMoney = () => {
    // payTheMoney(userid, { total: userInput.total, note: userInput.note }).then(res => {
    //     if (res.status === true) {
    //         userInfo.history.push(res.data)
    //         setUserInfo({ ...userInfo })
    //         setOpenPopup(false)
    //     }
    // })
  };
  const handleChange = e => {
    const { name, value, rawValue } = e.target;
    if (name === "total") {
      setUserInput({ ...userInput, total: rawValue });
    } else {
      setUserInput({ ...userInput, [name]: value });
    }
  };
  return (
    <Container>
      <Row>
        {renderUserInfo(userInfo, setOpenPopup)}
        {renderHistory(userInfo)}
      </Row>
      <Modal isOpen={openPopup} toggle={() => setOpenPopup(false)} fade>
        <ModalHeader toggle={() => setOpenPopup(false)}>
          Modal title
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleText">Số tiền</Label>
              <Cleave
                name="total"
                value={userInput.total}
                className="form-control"
                placeholder="Nhập số tiền"
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: "thousand"
                }}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="note">Ghi Chú</Label>
              <Input
                type="textarea"
                name="note"
                id="note"
                value={userInput.note}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handlePayTheMoney()}>
            {" "}
            Xạc nhận
          </Button>{" "}
          <Button color="secondary" onClick={() => setOpenPopup(false)}>
            {" "}
            Huỷ
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};
// const renderControl = (handlePayTheMoney: VoidFunction) => {
//     return <Col md={12}>
//         <div>

//         </div>
//     </Col>
// }
const renderUserInfo = (userInfo, setOpenPopup) => {
  return (
    <Col md={3}>
      {userInfo !== null ? (
        <div className="d-flex flex-column">
          <div className="detail-user__container justify-content-lg-between">
            <div className="text-center">
              <img
                src={userInfo.avata}
                alt="avata"
                className="detail-user__avata"
              />
            </div>
            <div className="mt-2">
              <div className="detail-title">{userInfo.name}</div>
              <div>
                Số điện thoại:
                <span className="text-primary"> {userInfo.phone_number}</span>
              </div>
              <div>
                Địa chỉ:{" "}
                <span className="text-primary">
                  {userInfo.address}, {userInfo.ward.name},{" "}
                  {userInfo.district.name}
                </span>
              </div>
              <div>
                Ngày mượn:{" "}
                <span className="text-danger">
                  {converDate(userInfo.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-user__container mt-2">
            <div className="detail-title">Tổng Số tiền</div>
            <div className="detail-total">{formatCurrency(userInfo.total)}</div>
          </div>
          <Button color="danger" onClick={() => setOpenPopup(true)}>
            {" "}
            Đóng tiền
          </Button>
        </div>
      ) : (
        <Spinner type="grow" color="primary" />
      )}
    </Col>
  );
};

const renderHistory = userInfo => {
  return (
    <Col md={9}>
      <div className="detail-user__container">
        {userInfo && userInfo.history && userInfo.history.length > 0 ? (
          <div>
            <div>
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Số tiền</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.history.map((item, index) => {
                    return (
                      <tr key={`history_pay_${index}`}>
                        <td>{converDate(item.created_at)}</td>
                        <td>{formatCurrency(item.total)}</td>
                        <td>{item.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <PageContentEmpty />
        )}
      </div>
    </Col>
  );
};
