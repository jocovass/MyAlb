import * as actionTypes from './types';

export const likeImage = imgId => {
    return {
        type: actionTypes.LIKE,
        imgId,
    };
};

export const dislikeImage = imgId => {
    return {
        type: actionTypes.DISLIKE,
        imgId,
    };
};