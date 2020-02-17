import { Api } from "..";
import { IResponseListUser } from "../../modal/response/listUser";
import { IResponseAddress } from "../../modal/response/address";


export const getListBorrower = (page: number) => {
    const path = `/api/getAllBorrowInfo?page=${page}`
    return Api.Get<IResponseListUser[]>(path)
}

export const getListDistrict = () => {
    const path = `/api/getListDistrict`
    return Api.Get<IResponseAddress[]>(path)
}
export const getListWard = (district_id: number) => {
    const path = `/api/getListWard?district_id=${district_id}`
    return Api.Get<IResponseAddress[]>(path)
}

export const createNewBorrower = (body: any) => {
    const path = `/api/createNewBorrower`
    return Api.POST<any>(path, body)
}
export const getDetailBorrower = (user_id: string | undefined) => {
    const path = `/api/getDetail/${user_id}`
    return Api.Get<IResponseListUser>(path)
}

export const payTheMoney = (user_id: string, body: { total: number, note: string }) => {
    const path = `/api/pay-the-money/${user_id}`
    return Api.POST<any>(path, body)
}