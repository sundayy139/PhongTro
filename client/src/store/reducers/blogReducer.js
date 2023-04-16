import actionsType from "../actions/actionsType";

const initialState = {
    blogs: null,
    count: '',
    msg: '',
    isLoading: true
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_BLOGS:
            return {
                ...state,
                blogs: action.blogs || [],
                msg: action.msg || '',
                count: action.count || 0,
                isLoading: action.blogs ? false : true
            }
        default:
            return state;
    }
}

export default postReducer