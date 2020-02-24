import * as React from "react";
import {
  getListBorrower
} from "../../Api/Service/borrower";
import { IResponseListUser } from "../../modal/response/listUser";
import { UserItem } from "./UserItem";
import { Row, Container } from "reactstrap";
import { Header } from "./Header";
import { ModalCreate } from "./PopupCreateUser";
import { useToasts } from "../../Components";

export const ListUserScreen: React.FC<{}> = () => {
  const [page] = React.useState<number>(1);
  const [listUser, setListUser] = React.useState<IResponseListUser[]>([]);
  const { showToast } = useToasts();
  React.useEffect(() => {
    getListBorrower().then(res => setListUser(res.data));
  }, [page]);

  const CreateSuccessUser = (data: IResponseListUser, callback: Function) => {
    const newa = [...listUser];
    newa.push(data);
    setListUser(newa);
    showToast();
    callback();
  };
  const UpdateSuccess = (data: IResponseListUser, callback: Function) => {
    const newa = [...listUser];
    const result = newa.map(item => (item.id === data.id ? data : item));
    setListUser(result);
    showToast();
    callback();
  };

  const DeleteSuccess = (data: IResponseListUser) => {
    const newa = [...listUser];
    const index = newa.findIndex(item => item.id === data.id);
    newa.splice(index, 1);
    console.log(newa);
    showToast();
    setListUser(newa);
  };

  return (
    <ListUserScreenContext.Provider
      value={{ CreateSuccessUser, UpdateSuccess }}
    >
      <ModalCreate>
        <Header />
        <Container fluid>
          <Row className="mt-4">
            {listUser &&
              listUser.length > 0 &&
              listUser.map((user, index) => (
                <UserItem
                  user={user}
                  key={index}
                  DeleteSuccess={DeleteSuccess}
                />
              ))}
          </Row>
        </Container>
      </ModalCreate>
    </ListUserScreenContext.Provider>
  );
};

export const ListUserScreenContext = React.createContext({} as iContext);

interface iContext {
  CreateSuccessUser: Function;
  UpdateSuccess: Function;
}
