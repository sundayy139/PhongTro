import actionsType from "../actions/actionsType";

const initialState = {
    categories: [],
    prices: [],
    acreages: [],
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
        default:
            return state;
    }
}

export default appReducer