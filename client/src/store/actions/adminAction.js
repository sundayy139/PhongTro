import * as apis from '../../services'
import actionsType from "./actionsType";

export const getUsersAdmin = () => async (dispatch) => {
    try {
        const res = await apis.apiGetUsersAdmin()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_USERS_ADMIN,
                users: res.data.users
            })
        } else {
            dispatch({
                type: actionsType.GET_USERS_ADMIN,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_USERS_ADMIN,
            users: null
        })
    }
}


export const setDataUserEdit = (dataEdit) => ({
    type: actionsType.SET_DATA_USER_EDIT,
    dataEdit,
})

export const clearDataUserEdit = () => ({
    type: actionsType.CLEAR_DATA_USER_EDIT,
    dataEdit: null,
})

export const getPostsAdmin = () => async (dispatch) => {
    try {
        const res = await apis.apiGetPostsAdmin()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_POSTS_ADMIN,
                posts: res.data.posts,
            })
        } else {
            dispatch({
                type: actionsType.GET_POSTS_ADMIN,
                posts: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS_ADMIN,
            posts: null
        })
    }
}

export const setDataBlogEdit = (dataEdit) => ({
    type: actionsType.SET_DATA_BLOG_EDIT,
    dataEdit,
})

export const clearDataBlogEdit = () => ({
    type: actionsType.CLEAR_DATA_BLOG_EDIT,
    dataEdit: null,
})

export const setNotification = (notify) => ({
    type: actionsType.SET_NOTIFICATION,
    notify: notify,
})

export const clearNotification = () => ({
    type: actionsType.CLEAR_NOTIFICATION,
    notify: null,
})