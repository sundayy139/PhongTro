import axios from '../axios';
export const apiRegisterMail = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/mailer/register",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiContactMail = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/mailer/contact",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}