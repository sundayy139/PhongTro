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
            type: actionsType.GET_PRIGET_USERS_ADMINCES,
            users: null
        })
    }
}

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