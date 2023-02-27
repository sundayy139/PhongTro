import actionsType from "../actions/actionsType";


const initialState = {
    usersData: null,
    allPostsUser: null,
    dataUserEdit: null,
    dataBlogEdit: null,
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
        case actionsType.GET_POSTS_ADMIN:
            return {
                ...state,
                allPostsUser: action.posts || null,
                msg: action.msg || '',
            }
        case actionsType.SET_DATA_BLOG_EDIT:
            return {
                ...state,
                dataBlogEdit: action.dataEdit || null,
            }
        case actionsType.CLEAR_DATA_BLOG_EDIT:
            return {
                ...state,
                dataBlogEdit: null,
            }
        default:
            return state;
    }
}

export default adminReducer