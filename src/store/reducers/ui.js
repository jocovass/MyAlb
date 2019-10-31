import * as actionTypes from '../actions/types';
import  { mergeObj } from '../../utility/utility';

const INITIAL_STATE = {
    loading: false,
};

const startLoader = (state, action) => {
    return mergeObj(state, { loading: true });
};

const destroyLoader = (state, action) => {
    return mergeObj(state, { loading: false });
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.START_LOADER: return startLoader(state);
        case actionTypes.DESTROY_LOADER: return destroyLoader(state);
        default: return state;
    }
};