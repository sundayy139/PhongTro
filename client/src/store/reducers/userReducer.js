import actionsType from "../actions/actionsType";

const initialState = {
    currentUserData: null,
    dataUserEdit: null,
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
        case actionsType.SET_DATA_USER_EDIT:
            return {
                ...state,
                dataUserEdit: action.dataEdit || null,
            }
        case actionsType.CLEAR_DATA_USER_EDIT:
            return {
                ...state,
                dataUserEdit: null,
            }
        default:
            return state;
    }
}

export default userReducer