import axios from '../axios';

export const apiGetCurrentUser = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/get-current-user",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}