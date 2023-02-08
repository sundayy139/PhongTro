import actionsType from "../actions/actionsType";

const initialState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                msg: ''
            }
        case actionsType.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: action.msg,
                update: !state.update
            }
        case actionsType.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: ''
            }
        default:
            return state;
    }
}

export default authReducer