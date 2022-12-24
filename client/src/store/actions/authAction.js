import * as apis from '../../services'
import actionsType from "./actionsType";

export const register = (payload) => async (dispatch) => {
    try {
        const res = await apis.apiRegister(payload)
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.REGISTER_SUCCESS,
                token: res.data.token
            })
        } else {
            dispatch({
                type: actionsType.REGISTER_FAIL,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.REGISTER_FAIL,
            token: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const res = await apis.apiLogin(payload)
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.LOGIN_SUCCESS,
                token: res.data.token
            })
        } else {
            dispatch({
                type: actionsType.LOGIN_FAIL,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.LOGIN_FAIL,
            token: null
        })
    }
}

export const logout = () => ({
    type: actionsType.LOGOUT
})