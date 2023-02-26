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
            dispatch({
                type: actionsType.LOG_OUT
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_CURRENT_USER,
            user: null,
            msg: error
        })
        dispatch({
            type: actionsType.LOG_OUT
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