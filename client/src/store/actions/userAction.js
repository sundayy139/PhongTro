import * as apis from '../../services'
import actionsType from "./actionsType";



export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await apis.apiGetCurrentUser()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_CURRENT_USER,
                user: res.data.user
            })
        } else {
            dispatch({
                type: actionsType.GET_CURRENT_USER,
                user: null,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_CURRENT_USER,
            user: null,
            msg: error
        })
    }
}
