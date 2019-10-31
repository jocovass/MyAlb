import * as actionTypes from './types';
import { db } from '../../config/firebase';

const dbSucceeded = () => {
    return {
        type: actionTypes.DB_SUCCEEDED,
    };
};

const dbFailed = (error) => {
    return {
        type: actionTypes.DB_FAILED,
        error
    };
};

const fetchDb = (imgs) => {
    return {
        type: actionTypes.FETCH_IMGS,
        imgs,
    }
}

export const onAddImage = (userId, data) => dispatch => {
    db.ref(`users/${userId}/images/${data.imgId}`).update(data)
        .then(resp => dispatch(dbSucceeded()))
        .catch(error => dispatch(dbFailed(error)));
};

export const onRemoveImage = (userId, imgId) => dispatch => {
    db.ref(`users/${userId}/images/${imgId}`).remove()
        .then(resp => dispatch(dbSucceeded()))
        .catch(error => dispatch(dbFailed(error)));
};

export const onFetchDb = (userId) => dispatch => {
    const userData = db.ref(`users/${userId}`);
    userData.on('value', (snapshot) => {
        const imgs = snapshot.val();
        dispatch(fetchDb(imgs));
    })
}