import axios from '../axios';
import axiosDf from "axios"

export const apiGetPosts = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/all",
                params: query
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
                url: '/api/v1/post/create',
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
                url: "/api/v1/post/posts_user",
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
                url: "/api/v1/post/update",
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
                url: "/api/v1/post/delete",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPostById = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/post_id",
                params: query
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
                url: "/api/v1/post/update_status",
                params: { postId }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetLabels = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/label",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiSetFavouritePost = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/post/favourite/add",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiRemoveFavouritePost = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/post/favourite/remove",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetFavouritePost = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/post/favourite",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


