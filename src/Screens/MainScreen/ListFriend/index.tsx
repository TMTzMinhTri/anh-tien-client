import * as React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';



export const ListFriend: React.FC<{}> = () => {
    return <ListGroup>
        <ListGroupItem active tag="button" action>Cras justo odio</ListGroupItem>
        <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem tag="button" action>Morbi leo risus</ListGroupItem>
        <ListGroupItem tag="button" action>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem disabled tag="button" action>Vestibulum at eros</ListGroupItem>
    </ListGroup>
}