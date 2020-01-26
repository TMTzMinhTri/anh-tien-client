import * as React from "react";
import { Input, Button } from "reactstrap";

export const Conversation: React.FC<{}> = () => {
    return <div >
        <div></div>
        <div>
            <Input type="text" name="chat" placeholder="nhập tin nhắn" />
            <Button>Gửi</Button>
        </div>
    </div>
}