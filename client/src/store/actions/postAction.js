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


export const getPostsLimit = (page) => async (dispatch) => {
    try {
        const res = await apis.apiGetPostsLimit(page)
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