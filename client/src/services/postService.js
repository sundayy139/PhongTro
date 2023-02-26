import axios from '../axios';
import axiosDf from "axios"

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

export const apiGetNewPosts = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/newpost",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUploadImages = (images) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axiosDf({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                data: images
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiCreateNewPost = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: '/api/v1/post/create-new-post',
                data: data
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPostsUser = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/get-posts-user",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdatePost = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/post/update-post",
                data: data
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiDeletePost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "delete",
                url: "/api/v1/post/delete-post",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPostById = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/post-by-id",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdateStatusPost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/post/update-status-post",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


