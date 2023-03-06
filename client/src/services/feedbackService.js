import axios from '../axios';

export const apiCreateFeedback = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/feedback/create",
                data: payload
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
