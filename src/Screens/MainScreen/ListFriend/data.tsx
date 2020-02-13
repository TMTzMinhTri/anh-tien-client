import { CSSProperties } from "react";


export interface Idata {
    _id: number,
    title: string,
    status: string
}

export const datas = [
    { _id: 1, title: "First Task", status: "pending" },
    { _id: 2, title: "Second Task", status: "pending" },
    { _id: 4, title: "Fourth Task", status: "assigned" },
    { _id: 5, title: "Fifth Task", status: "done" },
    { _id: 3, title: "Third Task", status: "pending" },
    { _id: 6, title: "Sixth Task", status: "in_progress" },
    { _id: 7, title: "Seventh Task", status: "in_progress" },
    { _id: 8, title: "Eighth Task", status: "done" },
    { _id: 9, title: "Ninth Task", status: "done" },
    { _id: 10, title: "Tenth Task", status: "done" }
] as Idata[]


// export const channels: string[] = ["backlog", "new", "wip", "review", "done"];
export const channels: string[] = ["pending", "assigned", "in_progress", "done", "canceled"]

export const labelsMap: any = {
    pending: "Chưa xử lý",
    assigned: "Đã tiếp nhận",
    in_progress: "Đang xử lý",
    done: "Đã xử lý",
    canceled: "Đã huỷ"
};

export const classes = {
    board: {
        display: "flex",
        margin: "0 auto",
        width: "90vw",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif'
    } as CSSProperties,
    column: {
        minWidth: 200,
        width: "18vw",
        height: "80vh",
        margin: "0 auto",
        backgroundColor: "#FCC8B2"
    } as CSSProperties,
    columnHead: {
        padding: 10,
        fontSize: "1.2em",
        backgroundColor: "#C6D8AF",
        textAlign: "center"
    } as CSSProperties,
    item: {
        padding: 10,
        margin: 10,
        fontSize: "0.8em",
        cursor: "pointer",
        backgroundColor: "white"
    } as CSSProperties
};