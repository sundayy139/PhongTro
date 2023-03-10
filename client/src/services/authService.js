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

export const apiChangePassword = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/auth/change-password",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiForgotPassword = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/auth/forgot-password",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiResetPassword = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/auth/reset-password",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}




