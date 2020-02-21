
// import db from "../utils/db"

export interface IResponse<T> {
    data: T,
    status: boolean,
    error: {
        message: string,
        code: string
    }
}


export const Api = {
    url: "http://localhost:5000",
    async Get<T>(path: string) {
        const url = `${this.url}${path}`
        // const token = await db.table('authToken').toArray()
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-USER-TOKEN": token.length > 0 ? token[0].token : null,
                    // "X-USER-PHONE": token.length > 0 ? token[0].phone_number : null
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    },
    async POST<T>(path: string, body: any) {
        const url = `${this.url}${path}`
        console.log(body)
        // const token = await db.table('authToken').toArray()
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-USER-TOKEN": token.length > 0 ? token[0].token : null,
                    // "X-USER-PHONE": token.length > 0 ? token[0].phone_number : null
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    },
    async PUT<T>(path: string, body: object) {
        const url = `${this.url}${path}`
        // const token = await db.table('authToken').toArray()
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-USER-TOKEN": token.length > 0 ? token[0].token : null,
                    // "X-USER-PHONE": token.length > 0 ? token[0].phone_number : null
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    },
    async DELETE<T>(path: string) {
        const url = `${this.url}${path}`
        // const token = await db.table('authToken').toArray()
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-USER-TOKEN": token.length > 0 ? token[0].token : null,
                    // "X-USER-PHONE": token.length > 0 ? token[0].phone_number : null
                }
            }).then(result => {
                resolve(result.json())
            }).catch(e => reject(e))
        }) as Promise<IResponse<T>>
    },
    async POST_WITH_FORMDATA<T>(path: string, body: FormData) {
        const url = `${this.url}${path}`
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(result => resolve(result.json()))
                .catch(e => reject(e))
        }) as Promise<IResponse<T>>

    }
}

