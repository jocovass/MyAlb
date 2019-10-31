import { SubmissionError } from 'redux-form';
import * as actionTypes from './types';
import { app, facebookProvider } from '../../config/firebase';
import history from '../../history';

export const signIn = (userId, userName, userImgUrl, token) => {
    return {
        type: actionTypes.SIGN_IN, userId, userName, userImgUrl, token, 
    };
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT,
    };
};

export const signInFail = error => {
    return {
        type: actionTypes.SIGN_IN_FAIL,
        error,
   };
};

export const signOutFail = error => {
    return {
        type: actionTypes.SIGN_OUT_FAIL,
        error,
   };
};

const signupSucceeded = (userName) => {
    return {
        type: actionTypes.SIGN_UP_SUCCEEDED,
        userName,
    }
};

const emailVerificationSucceeded = () => {
    return {
        type: actionTypes.VERIFICATION_SUCCEEDED,
    };
};

const emailVerificationFailed = () => {
    return {
        type: actionTypes.VERIFICATION_FAILED,
    };
};

const deletionFailed = error => {
    return {
        type: actionTypes.DELETION_FAILED,
        error,
    };
};

//SETTING TIMEOUT FOR AUTOMATIC LOGOUT
const setAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => {
        dispatch(onSignOut());
    }, expirationTime);
};

const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(onSignOut());        
    } else {
        const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
        if (expirationDate <= new Date()) {
            dispatch(onSignOut());            
        } else {
            dispatch(setAuthTimeout((expirationDate.getTime() - new Date().getTime())));
        }   
    }
};

//SAVE EXPIRATION DATE TO LOCALSTORAGE
const setExpirationDate = result => dispatch => {
    const expirationDate = new Date(+result.user.metadata.b).getTime() + 3600000;
    const userId = result.user.uid;
    result.user.getIdToken().then(token => {
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        dispatch(setAuthTimeout(3600000));
    });
};

//EVERY TIME THE AUTH STATE CHANGES TIHS FUNCTION RUNS (LOGIN, LOGOUT, PAGERELOAD)
export const onAuthChange = (isSignedIn, user) => dispatch => {
    if(isSignedIn) {
        const userId = user.uid;
        const userName = user.displayName;
        const userImgUrl = user.photoURL;
        user.getIdToken().then(token => {
            dispatch(signIn(userId, userName, userImgUrl, token));
            if(user.emailVerified) {
                dispatch(emailVerificationSucceeded())
            }
            dispatch(authCheckState());
        });
    } else {
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        dispatch(signOut());
    }
};

//AUTHENTICATE USER TROUGH FACEBOOK (WILL CREATE A USER WITH THIS EMAIL AND LOGIN)
export const onSignInWithFacebook = () => dispatch => {
    app.auth().signInWithPopup(facebookProvider)
        .then(resp => {
            dispatch(setExpirationDate(resp));
            dispatch(emailVerificationSucceeded())
        })
        .catch(error => dispatch(signInFail(error.message)));
};

//SEND EMAILVERIFICATION TO THE USERS EMAIL
export const sendEmailVerification = () => dispatch => {
    const actionCodeSettings = {
        url: `http://localhost:3000/?email=${app.auth().currentUser.email}`,
        handleCodeInApp: true,
    };
    app.auth().currentUser.sendEmailVerification(actionCodeSettings)
        .catch(error => dispatch(emailVerificationFailed()));
};

//CREATE USER WITH EMAIL AND PASSWORD
export const createUserWithEmail = ({ email, password, name }) => dispatch => {
    return app.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
            resp.user.updateProfile({
                displayName: name,
            })
            .then(() => dispatch(signupSucceeded(resp.user.displayName)));
            dispatch(sendEmailVerification());
            dispatch(setExpirationDate(resp));
        })
        .catch(error => {
            dispatch(signInFail(error.message));
            throw new SubmissionError({
                email: error.message,
                _error: 'Signup failed!',
            });
        });
};

//SIGN IN WITH EMAIL AND PASSWORD
export const signInWithEmail = ({ email, password }) => dispatch => {
    return app.auth().signInWithEmailAndPassword(email, password)
    .then(resp => {
        dispatch(setExpirationDate(resp));
    })
    .catch(error => {
        dispatch(signInFail(error.message));
        let property = null;
        if (error.code.includes('password')) {
            property = 'password';
        }
        else {
            property = 'email';
        }
        throw new SubmissionError({
            [property]: error.message,
            _error: 'Login failed',
        });
    });
};

//SIGN OUT USER
export const onSignOut = () => dispatch => {
    app.auth().signOut()
        .then(resp => history.replace('/'))
        .catch(error => dispatch(signOutFail(error.message)));
};

//SEND EMAIL TO THE USER IF THEY FORGET THE PASSWORD
export const sendPasswordResetEmail = ({ email }) => dispatch => {
    return app.auth().sendPasswordResetEmail(email)
        .catch(error => {
            throw new SubmissionError({
                email: error.message,
                _error: 'Something went wrong!',
            });
        });
};


//DELETE USES ACCOUNT
export const deleteUser = () => dispatch => {
    app.auth().currentUser.delete()
        .catch(error => {
            dispatch(deletionFailed(error.message));
            history.push('/error');
        });
}