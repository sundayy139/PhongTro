import axios from '../axios';

export const apiGetBlogs = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/blog/all",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetBlogById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/blog/blog_id",
                params: { id }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}