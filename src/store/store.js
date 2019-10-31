import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers = process.env.NODE_ENV === 'development' 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
: null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;