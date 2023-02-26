import actionsType from "../actions/actionsType";

const initialState = {
    posts: [],
    newPosts: [],
    postsUser: [],
    dataEdit: {},
    msg: '',
    count: 0
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
            }
        case actionsType.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionsType.GET_NEW_POSTS:
            return {
                ...state,
                newPosts: action.newPosts || [],
                msg: action.msg || '',
            }
        case actionsType.GET_POSTS_USER:
            return {
                ...state,
                postsUser: action.posts || [],
                msg: action.msg || '',
            }
        case actionsType.SET_DATA_EDIT:
            return {
                ...state,
                dataEdit: action.dataEdit || null,
            }
        case actionsType.CLEAR_DATA_EDIT:
            return {
                ...state,
                dataEdit: null,
            }
        default:
            return state;
    }
}

export default postReducer