import React from 'react';
import SocketContextProvider from "../Socket";
import { Container, Row, Col } from "reactstrap";
import ListFriend from "./ListFriend";

export const MainScreen: React.FC = () => {

    React.useEffect(() => {

    })

    const submit = () => {

    }

    return <SocketContextProvider>
        <Container fluid >
            {/* <Row> */}
                {/* <Col lg="12"> */}
                    <ListFriend />
                {/* </Col> */}
                {/* <Col lg="9">
                    <Conversation />
                </Col> */}
            {/* </Row> */}
        </Container>
    </SocketContextProvider>
}



