import actionsType from "../actions/actionsType";


const initialState = {
    usersData: null,
    allPostsUser: null,
    msg: ''
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_USERS_ADMIN:
            return {
                ...state,
                usersData: action.users || null,
                msg: action.msg || '',
            }
        case actionsType.GET_POSTS_ADMIN:
            return {
                ...state,
                allPostsUser: action.posts || null,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default adminReducer