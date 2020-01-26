import * as React from "react";
import { signIn } from "../../Api/Service/auth";


export const LoginContext = React.createContext({})


export default function (props: any) {

    // const SignIn = (data) => {
    //     signIn(data).then()
    // }


    return <LoginContext.Provider value={{}}>
        {props.children}
    </LoginContext.Provider>
}