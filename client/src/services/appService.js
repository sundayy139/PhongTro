import axios from '../axios';
import axiosDf from "axios"

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

export const apiGetProvinces = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/address/provinces",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetDistricts = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/address/districts",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetWards = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/address/wards",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


export const apiGetProvincesPublic = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axiosDf({
                method: "get",
                url: "https://vapi.vnappmob.com/api/province/",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetDistrictPublic = (provinceId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axiosDf({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetWardPublic = (districtId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axiosDf({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}





