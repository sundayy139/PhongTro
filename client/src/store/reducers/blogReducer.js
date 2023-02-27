import actionsType from "../actions/actionsType";

const initialState = {
    blogs: null,
    count: '',
    msg: '',
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_BLOGS:
            return {
                ...state,
                blogs: action.blogs || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        default:
            return state;
    }
}

export default postReducer