import * as React from "react";
import { getListBorrower } from "../../Api/Service/borrower";
import { IResponseListUser } from "../../modal/response/listUser";
import { UserItem } from "./UserItem";
import { Row, Container } from "reactstrap";
import { Header } from './Header'

export const ListUserScreen: React.FC<{}> = () => {
    const [page, setPage] = React.useState<number>(1)
    const [listUser, setListUser] = React.useState<IResponseListUser[]>([])
    const [openModalCreate, setOpenModalCreate] = React.useState<boolean>(false)

    React.useEffect(() => {
        // getListBorrower(page).then(res => setListUser(res.data))
    }, [page])

    const CreateSuccessUser = (data: IResponseListUser) => {
        const newa = [...listUser]
        newa.push(data)
        setListUser(newa)
        setOpenModalCreate(false)
    }


    return <ListUserScreenContext.Provider value={{ CreateSuccessUser }}>
        <Header setOpenModalCreate={setOpenModalCreate} openModalCreate={openModalCreate} />
        <Container fluid>
            <Row className="mt-4">
                {listUser.length > 0 && listUser.map((user, index) => <UserItem user={user} key={index} />)}
            </Row>
        </Container >
    </ListUserScreenContext.Provider>
}


export const ListUserScreenContext = React.createContext({} as iContext)


interface iContext {
    CreateSuccessUser: Function
}