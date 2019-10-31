import * as actionTypes from '../actions/types';
import { mergeObj } from '../../utility/utility';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    userName: null,
    userImgUrl: null,
    token: null,
    error: null,
    verified: false,
};

const signIn = (state, { userId, userName, userImgUrl, token }) => {
    return mergeObj(state, { userId, userName, userImgUrl, token, isSignedIn: true, error: null });
};

const signOut = (state, action) => {
    return mergeObj(state, { isSignedIn: false,
                             userId: null,
                             userName: null,
                             userImgUrl: null,
                             token: null,
                             error: null,
                             verified: false,
                            });
};

const singupSucceeded = (state, { userName }) => {
    return mergeObj(state, { userName });
};

const signInFail = (state, { error }) => {
    return mergeObj(state, { error });
};

const signOutFail = (state, { error }) => {
    return mergeObj(state, { error });
};

const verificationSucceeded = (state) => {
    return mergeObj(state, { verified: true });
};

const verificationFailed = (state) => {
    return mergeObj(state, { verified: false });
};

const deletionFailed = (state, { error }) => {
    return mergeObj(state, { error });
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SIGN_IN: return signIn(state, action);
        case actionTypes.SIGN_OUT: return signOut(state, action);
        case actionTypes.SIGN_UP_SUCCEEDED : return singupSucceeded(state, action);
        case actionTypes.SIGN_IN_FAIL: return signInFail(state, action);
        case actionTypes.SIGN_OUT_FAIL: return signOutFail(state, action);
        case actionTypes.VERIFICATION_SUCCEEDED: return verificationSucceeded(state);
        case actionTypes.VERIFICATION_FAILED: return verificationFailed(state);
        case actionTypes.DELETION_FAILED: return deletionFailed(state, action);
        default: return state;
    };
};