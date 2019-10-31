import * as actionTypes from '../actions/types';
import { mergeObj } from '../../utility/utility';

const INITIAL_STATE = {
    imgs: false,
    error: null,
};

const dbSucceeded = (state, action) => {
    return mergeObj(state, { error: null });
};

const dbFailed = (state, { error }) => {
    return mergeObj(state, { error });
};

const fetchImgs = (state, { imgs }) => {
    return mergeObj(state, { imgs, error: null });
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.DB_SUCCEEDED: return dbSucceeded(state);
        case actionTypes.DB_FAILED: return dbFailed(state, action);
        case actionTypes.FETCH_IMGS: return fetchImgs(state, action);
        default: return state;
    }
};