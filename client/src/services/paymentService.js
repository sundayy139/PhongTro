import axios from '../axios';


export const apiCreateVnpayUrl = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/payment/create-payment-url",
                data: data
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiVnpayReturn = (params) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/vnpay-return",
                params: { params }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPaymentHistory = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/pay-history",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}