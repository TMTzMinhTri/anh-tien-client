export interface IResponseListUser {
    id: number,
    name: string,
    address: string,
    district: {
        id: number, name: string
    },
    ward: {
        id: number, name: string
    },
    phone_number: string,
    total: number,
    avata: string,
    created_at: Date,
    updated_at: Date,
    history?: Ihistory[]
}
interface Ihistory {
    status: boolean,
    note: string,
    total: number,
    created_at: Date,
    updated_at: Date
}