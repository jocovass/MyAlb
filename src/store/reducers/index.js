import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import uiReducer from './ui';
import fetchReducer from './fetch';
import likesReducer from './likes';
import dbReducer from './db';

export default combineReducers({
    authReducer,
    uiReducer,
    fetchReducer,
    likesReducer,
    dbReducer,
    form: formReducer
});