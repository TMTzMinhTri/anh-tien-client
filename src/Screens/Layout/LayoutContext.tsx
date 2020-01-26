import * as React from "react";
import { signIn } from "../../Api/Service/auth";
import { IPostSignIn } from "../../modal/response/auth";


interface ILayoutContext {
    SignIn: Function,
    authenticated: boolean
}

export const LayoutContext = React.createContext({} as ILayoutContext)



export default function (props: any) {
    const [authenticated, setAuthenticated] = React.useState<boolean>(false)

    const SignIn = (data: IPostSignIn, cb: Function) => {
        signIn(data).then(rsp => {
            if(rsp.status === true){
                localStorage.setItem('auth_token', rsp.data.token)
                setAuthenticated(true)
            }
            cb(rsp)
        })
    }



    return <LayoutContext.Provider value={{ SignIn, authenticated }}>
        {props.children}
    </LayoutContext.Provider>
}