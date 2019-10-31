import * as actionTypes from '../actions/types';
import { mergeObj } from '../../utility/utility';

const INITIAL_STATE = {
    error: null,
    imgs: null,
    searchTerm: '',
};

const successReducer = (state , imgs, searchTerm) => {
    return mergeObj(state, { imgs, error: null, searchTerm });
};

const failReducer = (state, error) => {
    return mergeObj(state, { error, searchTerm: '' });
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_SUCCESS: return successReducer(state, action.imgs, action.searchTerm);
        case actionTypes.SEARCH_FAIL: return failReducer(state, action.error);
        case actionTypes.FETCH_SUCCESS: return successReducer(state, action.imgs);
        case actionTypes.FETCH_FAIL: return failReducer(state, action.error);
        default: return state;
    }
 };