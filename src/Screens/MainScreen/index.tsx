import React from 'react';
import SocketContextProvider from "../Socket";
import { Container, Row, Col } from "reactstrap";
import { ListFriend } from "./ListFriend";
import { Conversation } from "./Conversation";




export const MainScreen: React.FC = () => {

    React.useEffect(() => {

    })

    const submit = () => {

    }

    return <SocketContextProvider>
        <Container>
            <Row>
                <Col lg="3">
                    <ListFriend />
                </Col>
                <Col lg="9">
                    <Conversation />
                </Col>
            </Row>
        </Container>
    </SocketContextProvider>
}

