import actionsType from "../actions/actionsType";

const initialState = {
    categories: [],
    prices: [],
    acreages: [],
    provinces: [],
    curCategoryCode: null,
    isOpenMenuResponse: 'false',
    flag: false,
    msg: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: actionsType.msg || ''
            }
        case actionsType.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                msg: actionsType.msg || ''
            }
        case actionsType.GET_ACREAGES:
            return {
                ...state,
                acreages: action.acreages || [],
                msg: actionsType.msg || ''
            }
        case actionsType.GET_PROVINCES:
            return {
                ...state,
                provinces: action.provinces || [],
                msg: actionsType.msg || ''
            }
        case actionsType.SET_CURRENT_CATEGORY_CODE:
            return {
                ...state,
                curCategoryCode: action.curCategoryCode || null
            }
        case actionsType.SET_FLAG:
            return {
                ...state,
                flag: action.flag
            }

        default:
            return state;
    }
}

export default appReducer