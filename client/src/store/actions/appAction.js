import * as apis from '../../services'
import actionsType from "./actionsType";

export const getCategories = () => async (dispatch) => {
    try {
        const res = await apis.apiGetCategories()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_CATEGORIES,
                categories: res.data.categories
            })
        } else {
            dispatch({
                type: actionsType.GET_CATEGORIES,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_CATEGORIES,
            categories: null
        })
    }
}

export const getPrices = () => async (dispatch) => {
    try {
        const res = await apis.apiGetPrices()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_PRICES,
                prices: res.data.prices
            })
        } else {
            dispatch({
                type: actionsType.GET_PRICES,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_PRICES,
            prices: null
        })
    }
}

export const getAcreages = () => async (dispatch) => {
    try {
        const res = await apis.apiGetAcreages()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_ACREAGES,
                acreages: res.data.acreages
            })
        } else {
            dispatch({
                type: actionsType.GET_ACREAGES,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_ACREAGES,
            acreages: null
        })
    }
}