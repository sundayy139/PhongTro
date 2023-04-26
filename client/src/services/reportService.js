import axios from '../axios';


export const apiCreateReport = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "post",
                url: "/api/v1/report/create",
                data: data
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
