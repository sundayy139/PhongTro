import axios from '../axios';

export const apiRegister = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/auth/register",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiLogin = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/auth/login",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}