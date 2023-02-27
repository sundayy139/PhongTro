import * as apis from '../../services'
import actionsType from "./actionsType";



export const getBlogs = (query) => async (dispatch) => {
    try {
        const res = await apis.apiGetBlogs(query)
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_BLOGS,
                blogs: res.data.blogs?.rows,
                count: res.data.blogs?.count
            })
        } else {
            dispatch({
                type: actionsType.GET_BLOGS,
                blogs: null,
                msg: res.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_BLOGS,
            blogs: null
        })
    }
}
