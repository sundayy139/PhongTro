import authReducer from './authReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist'
import postReducer from './postReducer';
import appReducer from './appReducer';
import adminReducer from './adminReduce';
import blogReducer from './blogReducer';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: [
        'isLoggedIn',
        'token',
    ]
}

const appConfig = {
    ...commonConfig,
    key: 'app',
    whitelist: [
        'curCategoryCode',
    ]
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    admin: adminReducer,
    blog: blogReducer,
    app: persistReducer(appConfig, appReducer),
})


export default rootReducer