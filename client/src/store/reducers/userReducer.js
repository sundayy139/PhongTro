import actionsType from "../actions/actionsType";

const initialState = {
    currentUserData: null,
    msg: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_CURRENT_USER:
            return {
                ...state,
                currentUserData: action.user || [],
                msg: action.msg || '',
            }
        case actionsType.LOG_OUT:
            return {
                ...state,
                currentUserData: null,
                msg: ''
            }
        default:
            return state;
    }
}

export default userReducer