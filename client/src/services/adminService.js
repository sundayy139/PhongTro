import axios from '../axios';

export const apiGetUsersAdmin = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/get-users",
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
                url: "/api/v1/post/get-posts",
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
                url: "/api/v1/user/delete-user",
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
                url: "/api/v1/post/approve-post",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiRefusePost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/post/refuse-post",
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
                url: "/api/v1/blog/create-blog",
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
                url: "/api/v1/blog/delete-blog",
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
                url: "/api/v1/blog/update-blog",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetCountUserByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/get-count-user-by-month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetCountUserByDay = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/get-count-user-by-day",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetUserByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/get-user-by-month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetCountPostByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/get-count-post-by-month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetCountPostByDay = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/get-count-post-by-day",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


export const apiGetPostByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/get-post-by-month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}