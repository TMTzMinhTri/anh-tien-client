import * as React from 'react'
import { Row, Input, Button, Col } from "reactstrap";
import { ModalCreate } from '../PopupCreateUser'

interface IProps {
    setOpenModalCreate: Function,
    openModalCreate: boolean
}

export const Header: React.FC<IProps> = ({ setOpenModalCreate, openModalCreate }) => {
    return <React.Fragment>
        <Row className="mt-4">
            <Col xl={4} className="d-flex">
                <Input className="w-75 mr-2" placeholder="Nhập tên người cần tìm" />
                <Button>Tìm kiếm</Button>
            </Col>
            <Col xl={8} className="d-flex justify-content-end">
                <Button color="primary" onClick={() => setOpenModalCreate(true)}>Tạo mới</Button>
            </Col>
        </Row>
        {openModalCreate && <ModalCreate openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} />}
    </React.Fragment>
}




