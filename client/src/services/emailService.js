import axios from '../axios';
export const apiRegisterMail = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/mailer/registerMail",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}