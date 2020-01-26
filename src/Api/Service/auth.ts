import { Api } from ".."
import { IPostSignIn } from "../../modal/response/auth"

export const signIn = (data: IPostSignIn) => {
    const path = `/api/signin`
    return Api.POST<{ token: string }>(path, data)
}