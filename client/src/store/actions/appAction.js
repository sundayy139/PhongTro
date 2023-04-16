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

export const setCurCategoryCode = (curCategoryCode) => ({
    type: actionsType.SET_CURRENT_CATEGORY_CODE,
    curCategoryCode
})

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

export const getProvinces = () => async (dispatch) => {
    try {
        const res = await apis.apiGetProvinces()
        if (res.data.err === 0) {
            dispatch({
                type: actionsType.GET_PROVINCES,
                provinces: res.data.provinces
            })
        } else {
            dispatch({
                type: actionsType.GET_PROVINCES,
                msg: res.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_PROVINCES,
            provinces: null
        })
    }
}

export const setFlag = (flag) => ({
    type: actionsType.SET_FLAG,
    flag,
})
