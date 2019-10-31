import * as actionTypes from '../actions/types';
import { mergeObj } from '../../utility/utility';

const INITIAL_STATE = {
    likes: [],
};

const likeReducer = (state, imgId) => {
    return mergeObj(state, { likes: [...state.likes, imgId]});
};

const dislikeReducer = (state, imgId) => {
    const likes = [...state.likes].filter(val => val !== imgId);
    return mergeObj(state, { likes });
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.LIKE: return likeReducer(state, action.imgId);
        case actionTypes.DISLIKE: return dislikeReducer(state, action.imgId);
        default: return state;
    }
};