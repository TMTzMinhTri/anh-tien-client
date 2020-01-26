import * as React from 'react'
import socketIOClient from 'socket.io-client'
import sailsIOClient from "sails.io.js";

var io = sailsIOClient(socketIOClient);

io.sails.url = 'http://localhost:5000';



export const SocketContext = React.createContext({} as any)

// export const Socket: React.FC<{}> = ({ children }) => {



//     return
// }
export default function (props: any) {

    React.useEffect(() => {
        io.socket.on('hello', function (data) {
            console.log(data);
        });
    })


    React.useEffect(() => {
        io.socket.post("/api/login", { name: "MinhTri", room: "test" },(resData, body) => {
            console.log(resData, body)
        })

    }, [])


    return <SocketContext.Provider value={{}}>
        {props.children}
    </SocketContext.Provider>
}