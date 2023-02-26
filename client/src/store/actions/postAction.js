import * as apis from '../../services'
import actionsType from "./actionsType";



export const getPosts = () => async (dispatch) => {
    try {
        const res = await apis.apiGetPosts()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_POSTS,
                posts: res.data.posts
            })
        } else {
            dispatch({
                type: actionsType.GET_POSTS,
                posts: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS,
            posts: null
        })
    }
}


export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const res = await apis.apiGetPostsLimit(query)
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_POSTS_LIMIT,
                posts: res.data.posts?.rows,
                count: res.data.posts?.count
            })
        } else {
            dispatch({
                type: actionsType.GET_POSTS_LIMIT,
                posts: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS_LIMIT,
            posts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const res = await apis.apiGetNewPosts()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_NEW_POSTS,
                newPosts: res.data.newposts
            })
        } else {
            dispatch({
                type: actionsType.GET_NEW_POSTS,
                newPosts: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_NEW_POSTS,
            newPosts: null
        })
    }
}

export const getPostsUser = () => async (dispatch) => {
    try {
        const res = await apis.apiGetPostsUser()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_POSTS_USER,
                posts: res.data.posts,
            })
        } else {
            dispatch({
                type: actionsType.GET_POSTS_USER,
                posts: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS_USER,
            posts: null
        })
    }
}

export const setDataEdit = (dataEdit) => ({
    type: actionsType.SET_DATA_EDIT,
    dataEdit,
})

export const clearDataEdit = () => ({
    type: actionsType.CLEAR_DATA_EDIT,
    dataEdit: null,
})