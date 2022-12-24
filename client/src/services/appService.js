import axios from '../axios';

export const apiGetCategories = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/category/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPrices = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/price/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetAcreages = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/acreage/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}




