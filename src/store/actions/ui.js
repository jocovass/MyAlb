import * as actionTypes from './types';

export const startLoader = () => {
    return {
        type: actionTypes.START_LOADER,
    };
};

export const destroyLoader = () => {
    return {
        type: actionTypes.DESTROY_LOADER,
    };
};