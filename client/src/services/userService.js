import axios from '../axios';

export const apiGetCurrentUser = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/current_user",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


export const apiUpdateUserProfile = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/user/profile/update",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}