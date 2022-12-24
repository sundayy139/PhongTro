import actionsType from "../actions/actionsType";

const initialState = {
    posts: [],
    msg: '',
    count: 0
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
            }
        case actionsType.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        default:
            return state;
    }
}

export default postReducer