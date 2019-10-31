import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './history';
import store from './store/store';
import './scss/main.scss';
import App from './containers/App';

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));