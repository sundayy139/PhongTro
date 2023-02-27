import axios from '../axios';

export const apiGetBlogs = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/blog/get-blogs",
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
                url: "/api/v1/blog/get-blog-by-id",
                params: { id }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}