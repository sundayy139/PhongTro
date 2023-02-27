import axios from '../axios';

export const apiGetUsersAdmin = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/admin/get-users",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPostsAdmin = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/admin/get-posts",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiDeleteUserAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "delete",
                url: "/api/v1/admin/delete-user",
                params: { id }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiApprovePost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/admin/approve-post",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


export const apiCreateBlog = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/admin/create-blog",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiDeleteBlogAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "delete",
                url: "/api/v1/admin/delete-blog",
                params: { id }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdateBlogAdmin = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/admin/update-blog",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}