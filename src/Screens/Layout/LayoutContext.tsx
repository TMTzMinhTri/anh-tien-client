import * as React from "react";
import { signIn } from "../../Api/Service/auth";
import { IPostSignIn } from "../../modal/response/auth";
import { IResponseListUser } from "../../modal/response/listUser";
import { getListBorrower } from "../../Api/Service/borrower";


interface ILayoutContext {
    listUser: IResponseListUser[]
}

export const LayoutContext = React.createContext({} as ILayoutContext)



export default function (props: any) {
    const [page, setPage] = React.useState<number>(1)
    const [listUser, setListUser] = React.useState<IResponseListUser[]>([])


    React.useEffect(() => {
        getListBorrower().then(res => setListUser(res.data))
    }, [page])



    return <LayoutContext.Provider value={{ listUser }}>
        {props.children}
    </LayoutContext.Provider>
}