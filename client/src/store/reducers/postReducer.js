import actionsType from "../actions/actionsType";

const initialState = {
    posts: [],
    allPosts: [],
    newPosts: [],
    postsUser: [],
    dataEdit: {},
    favouritePost: [],
    relatePosts: [],
    searchTitle: '',
    isLoadingPosts: true,
    isLoadingNewPosts: true,
    isLoadingRelatePosts: true,
    msg: '',
    count: 0
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_POSTS:
            return {
                ...state,
                allPosts: action.posts || [],
                msg: action.msg || '',
                isLoadingPosts: action.posts ? false : true
            }
        case actionsType.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0,
                isLoadingPosts: action.posts ? false : true
            }
        case actionsType.GET_RELATE_POSTS_LIMIT:
            return {
                ...state,
                relatePosts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0,
                isLoadingRelatePosts: action.posts ? false : true
            }
        case actionsType.GET_NEW_POSTS:
            return {
                ...state,
                newPosts: action.newPosts || [],
                msg: action.msg || '',
                isLoadingNewPosts: action.posts ? false : true
            }
        case actionsType.GET_POSTS_USER:
            return {
                ...state,
                postsUser: action.posts || [],
                msg: action.msg || '',
                isLoading: action.posts ? false : true
            }
        case actionsType.GET_POSTS_BY_ID:
            return {
                ...state,
                posts: action.posts || [],
                count: action.count || 0,
                msg: action.msg || '',
                isLoading: action.posts ? false : true
            }
        case actionsType.GET_POSTS_FAVOURITES:
            return {
                ...state,
                favouritePost: action.postId || [],
                msg: action.msg || '',
                isLoading: action.posts ? false : true
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
        case actionsType.SET_SEARCH_TITLE:
            return {
                ...state,
                searchTitle: action.title,
            }
        default:
            return state;
    }
}

export default postReducer