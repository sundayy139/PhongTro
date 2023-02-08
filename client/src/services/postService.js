import axios from '../axios';

export const apiGetPosts = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPostsLimit = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: '/api/v1/post/limit',
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetNewPosts = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/newpost",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
