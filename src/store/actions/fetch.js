import * as actionTypes from './types';
import axios from '../../axios';
import history from '../../history';

const searchSuccess = (imgs, searchTerm) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        imgs,
        searchTerm,
    };
};

const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error
    };
};

const sortImgs = imgs => {
    return imgs.reduce((acc, cur) => {
        const newImg = {
            madeBy: cur.user.name,
            alt: cur.alt_description,
            download: cur.links.html,
            imgs: {
                thumb: cur.urls.thumb,
                small: cur.urls.small,
                regular: cur.urls.regular,
                full: cur.urls.full,
            },
            imgId: cur.id,
        };
        acc.push(newImg);

        return acc;
    }, []);
};

export const initSearch = (query) => {
    return dispatch => {
        axios.get(`/search/photos?client_id=746eb8e8d57534c47c3767d711d036488ead28db069162c55692d64d433cb09f&query=${query}&per_page=30`)
        .then(resp => {
            const imgs = sortImgs(resp.data.results);
            dispatch(searchSuccess(imgs, query));
        })
        .catch(error => {
            history.push('/error');
            dispatch(searchFail(error.message));
        });
    }
};

const fetchSuccess = (imgs) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        imgs,
    }
};

const fetchFail = (error) => {
    return {
        type:  actionTypes.FETCH_FAIL,
        error,
    }
};

export const initFetch = () => {
    return dispatch => {
        axios.get('/photos/random?client_id=746eb8e8d57534c47c3767d711d036488ead28db069162c55692d64d433cb09f&count=30')
        .then(resp => {
            const imgs = sortImgs(resp.data);
            dispatch(fetchSuccess(imgs));
        })
        .catch(err => {
            dispatch(fetchFail(err.message));
            history.push('/error');
        });
    }
};