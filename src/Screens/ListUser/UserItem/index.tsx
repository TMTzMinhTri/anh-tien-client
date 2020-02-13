import * as React from "react";
import { IResponseListUser } from "../../../modal/response/listUser";
import { formatCurrency, converDate } from "../../../utils";
import {
    Col, Card, CardImg, CardText, CardBody,
    CardTitle, ButtonGroup, Button
} from "reactstrap";
import "./index.css"
import { useHistory } from "react-router-dom";
interface IPropsUserItem {
    user: IResponseListUser
}

export const UserItem: React.SFC<IPropsUserItem> = React.memo(({ user }) => {
    let history = useHistory();
    const showHistory = () => {
        const path = `list-user/${user.id}`
        history.push(path);
    }
    return <Col xl="2">
        <Card className="p-2">
            <CardImg top width="100%" height="200" src={user.avata} alt="Card image cap" style={{ objectFit: "cover" }} />
            <CardBody>
                <CardTitle>{user.name ? user.name : "Trần Minh Trí"}</CardTitle>
                <CardText>Số điện thoại: {user.phone_number}</CardText>
                <CardText>Địa chỉ: {user.address}</CardText>
                <CardText>Số tiền mượn: {formatCurrency(user.total)}</CardText>
                <CardText>Ngày mượn: {converDate(user.created_at)}</CardText>
            </CardBody>
            <ButtonGroup>
                <Button color="success" onClick={showHistory}>Lịch sử</Button>
                <Button>Chỉnh sửa</Button>
                <Button color="danger">Xoá</Button>
            </ButtonGroup>
        </Card>
    </Col>
})