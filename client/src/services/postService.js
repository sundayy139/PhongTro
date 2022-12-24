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

export const apiGetPostsLimit = (page) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: `/api/v1/post/limit?page=${page}`,
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

