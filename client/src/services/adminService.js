import axios from '../axios';

export const apiGetUsersAdmin = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/user/all",
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
                url: "/api/v1/post/all_post_admin",
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
                url: "/api/v1/user/delete",
                params: { id }
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdateStatusPostAdmin = (params) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/post/update_status_post_admin",
                params: params
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
                url: "/api/v1/blog/create",
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
                url: "/api/v1/blog/delete",
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
                url: "/api/v1/blog/update",
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
                url: "/api/v1/user/count_user_by_month",
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
                url: "/api/v1/user/count_user_by_day",
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
                url: "/api/v1/user/user_by_month",
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
                url: "/api/v1/post/count_post_by_month",
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
                url: "/api/v1/post/count_post_by_day",
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
                url: "/api/v1/post/post_by_month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetPaymentSuccess = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/pay_success",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetTotalPayment = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/total_pay",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}



export const apiGetPaymentByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/pay_by_month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetTotalPaymentByMonth = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/total_pay_by_month",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetTotalPaymentByDay = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/payment/total_pay_by_day",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiGetAllReport = () => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "get",
                url: "/api/v1/report/all",
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiUpdateStatusReport = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "put",
                url: "/api/v1/report/update_status",
                params: query
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export const apiDeleteReportAdmin = (reportId) => {
    return new Promise((resolve, reject) => {
        try {
            const res = axios({
                method: "delete",
                url: "/api/v1/report/delete_report",
                params: reportId
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}


