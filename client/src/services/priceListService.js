import axios from '../axios';

export const apiGetPriceList = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/price_list/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


export const apiUpdatePriceList = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/price_list/update",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
