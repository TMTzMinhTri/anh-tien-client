import * as React from "react";
import "react-dropzone-uploader/dist/styles.css";
// import Dropzone, { ILayoutProps, IPreviewProps, IDropzoneProps, IFileWithMeta } from "react-dropzone-uploader";
// import classnames from "classnames";
import {
  // Progress,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  ModalFooter,
  Button,
  Input
} from "reactstrap";
import { IResponseAddress } from "../../../modal/response/address";
import {
  getListDistrict,
  getListWard,
  createNewBorrower,
  updateBorrowerInfo
} from "../../../Api/Service/borrower";
import Cleave from "cleave.js/react";
import "./index.css";
import { ListUserScreenContext } from "..";
import { IResponseListUser } from "../../../modal/response/listUser";

interface IModalCreateContextProps {
  openModal: Function;
}
const ModalCreateContext = React.createContext({} as IModalCreateContextProps);

export const ModalCreate: React.SFC<{}> = ({ children }) => {
  const [status, setStatus] = React.useState("create");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { CreateSuccessUser, UpdateSuccess } = React.useContext(
    ListUserScreenContext
  );
  const [mount, setmount] = React.useState<boolean>(false);
  const [districts, setDistricts] = React.useState<IResponseAddress[]>([]);
  const [wards, setWards] = React.useState<IResponseAddress[]>([]);

  const [address, setAddress] = React.useState<{
    district: number;
    ward: number;
  }>({ district: 0, ward: 0 });

  const [userSelect, SetUserSelect] = React.useState({
    id: null,
    name: "",
    address: "",
    total: 0,
    phone_number: "0"
  });
  const handleChange = (e: any) => {
    const { name, value, rawValue } = e.target;
    if (name === "total") {
      if (rawValue === "") SetUserSelect({ ...userSelect, total: 0 });
      else SetUserSelect({ ...userSelect, total: rawValue });
    } else {
      SetUserSelect({ ...userSelect, [name]: value });
    }
  };

  React.useEffect(() => {
    getListDistrict().then(res => {
      setDistricts(res.data);
      setAddress({ ...address, district: res.data[0].id });
      getListWard(res.data[0].id).then(rb => {
        setWards(rb.data);
        setAddress({ ...address, ward: rb.data[0].id });
        setmount(true);
      });
    });
  }, []);

  React.useEffect(() => {
    if (mount === true) {
      getListWard(address.district).then(rb => {
        setWards(rb.data);
        setAddress({ ...address, ward: rb.data[0].id });
      });
    }
  }, [address.district]);

  const create = () => {
    const data = {
      name: userSelect.name,
      total: userSelect.total,
      phone_number: userSelect.phone_number,
      address: userSelect.address,
      // avata: avata,
      district: address.district,
      ward: address.ward
    };
    createNewBorrower(data).then(res => {
      if (res.status === true) {
        CreateSuccessUser(res.data, () => {
          setIsOpen(false);
        });
      }
    });
  };
  const update = () => {
    const data = {
      name: userSelect.name,
      total: userSelect.total,
      phone_number: userSelect.phone_number,
      address: userSelect.address,
      district: address.district,
      ward: address.ward
    };
    updateBorrowerInfo(userSelect.id, data).then(rsp => {
      UpdateSuccess(rsp.data, () => {
        setIsOpen(false);
      });
    });
  };
  const openModal = (visible: boolean, info?: IResponseListUser) => {
    if (info) {
      SetUserSelect({
        name: info.name,
        phone_number: info.phone_number,
        total: info.total,
        address: info.address,
        id: info.id
      });
      setAddress({
        ...address,
        ward: info.ward,
        district: info.district
      });
      setStatus("edit");
      setIsOpen(visible);
    } else {
      setIsOpen(visible);
      setStatus("create");
      SetUserSelect({
        id: null,
        name: "",
        address: "",
        total: 0,
        phone_number: "0"
      });
    }
  };
  // const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: 'https://httpbin.org/post' })
  return (
    <ModalCreateContext.Provider value={{ openModal }}>
      <Modal isOpen={isOpen} toggle={() => openModal(!isOpen)} size="lg">
        <ModalHeader toggle={() => openModal(!isOpen)}>
          {status === "create" ? "Tạo mới" : "Cập nhật"}
        </ModalHeader>
        <ModalBody>
          <Form>
            {/* <Row>
                    <Col md={12}>
                        <Dropzone
                            getUploadParams={getUploadParams}
                            LayoutComponent={Layout}
                            multiple={false}
                            PreviewComponent={Preview}
                            onChangeStatus={(value, status) => {
                                if (status === "done") {
                                    console.log(value)
                                    setAvata(value.meta)
                                }
                            }}
                            inputContent={Icon}
                            maxFiles={1}
                        />
                    </Col>
                </Row> */}
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Họ tên</Label>
                  <Input
                    type="text"
                    name="name"
                    value={userSelect.name}
                    id="name"
                    placeholder="Họ tên người mượn tiền"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="phone_number">Số điện thoại</Label>
                  <Input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={userSelect.phone_number}
                    placeholder="Số điện thoại"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="phone_number">Số tiền mượn</Label>
                  <Cleave
                    name="total"
                    className="form-control"
                    placeholder="Nhập số tiền"
                    value={userSelect.total}
                    options={{
                      numeral: true,
                      numeralThousandsGroupStyle: "thousand"
                    }}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Địa chỉ</Label>
                  <Input
                    type="text"
                    name="address"
                    id="exampleAddress"
                    value={userSelect.address}
                    placeholder="1234 Main St"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="district">Quận</Label>
                  <Input
                    type="select"
                    name="district"
                    id="district"
                    onChange={event =>
                      setAddress({
                        ...address,
                        district: parseInt(event.target.value)
                      })
                    }
                    value={address.district}
                  >
                    {districts.length > 0 &&
                      districts.map((district, index) => (
                        <option
                          value={district.id}
                          key={`district_item_${index}`}
                        >
                          {district.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="ward">Phường</Label>
                  <Input
                    type="select"
                    name="ward"
                    id="ward"
                    value={address.ward}
                    onChange={event =>
                      setAddress({
                        ...address,
                        ward: parseInt(event.target.value)
                      })
                    }
                  >
                    {wards.length > 0 &&
                      wards.map((ward, index) => (
                        <option value={ward.id} key={`ward_item_${index}`}>
                          {ward.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          {status === "create" ? (
            <Button color="primary" onClick={create}>
              Tạo mới
            </Button>
          ) : (
            <Button color="primary" onClick={update}>
              Cập nhật
            </Button>
          )}
          <Button color="secondary" onClick={() => openModal(false)}>
            Huỷ
          </Button>
        </ModalFooter>
      </Modal>
      {children}
    </ModalCreateContext.Provider>
  );
};

export const useModal = () => React.useContext(ModalCreateContext);

// const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
//     return (<React.Fragment>
//         <div {...dropzoneProps} key={"asdasd"}>
//             {previews}
//             {files.length === 0 && input}
//         </div>
//     </React.Fragment>
//     )
// }
// const Preview = ({ meta: { percent, previewUrl, name, status, id }, fileWithMeta: { remove }, }: IPreviewProps) => {
//     return <div className={classnames("dzu-previewContainer")} key={id}>
//         <img src={previewUrl} alt={name} className="dzu-previewImage" />
//         {status !== "done" && <div className="dzu-previewStatusContainer">
//             <Progress value={percent} />
//         </div>}
//         <div className="dzu-previewImage--icon-close" onClick={remove}>
//             X
//         </div>
//     </div>
// }

// const Icon = <svg
//     xmlns="http://www.w3.org/2000/svg"
//     x="0"
//     y="0"
//     width={50}
//     height={50}
//     enableBackground="new 0 0 512 512"
//     version="1.1"
//     viewBox="0 0 512 512"
//     xmlSpace="preserve"
// >
//     <path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z"></path>
// </svg>
