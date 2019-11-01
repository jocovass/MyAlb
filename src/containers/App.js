import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Search from './Search/Search';
import Gallery from './Gallery/Gallery';
import VerificationWarning from '../components/VerificationWarning/VerificationWarning';
import asyncComp from '../components/HOC/asyncComp/asyncComp';
import Footer from '../components/Footer/Footer';

const asyncLikes = asyncComp(() => {
    return import('./Likes/Likes');
});

const asyncLogin = asyncComp(() => {
    return import('../components/LoginForm/LoginForm');
});

const asyncSignup = asyncComp(() => {
    return import('../components/SignupForm/SignupForm');
});

const asyncPassword = asyncComp(() => {
    return import('../components/PasswordForm/PasswordForm');
});

const asyncError = asyncComp(() => {
    return import('../components/Error/Error');
})

class App extends React.Component {
    render() {
        let warn = null;
        if(!this.props.verified && this.props.isSignedIn && !this.props.error) {
            warn = <VerificationWarning />
        }
        return (
            <React.Fragment>
                <div className="main-content">
                    <Header />
                    <Route path={process.env.PUBLIC_URL + "/"} exact component={Search} />
                    { warn }
                    <Route path={process.env.PUBLIC_URL + "/"} exact component={Gallery} />
                    <Route path={process.env.PUBLIC_URL + "/login"} component={asyncLogin} />
                    <Route path={process.env.PUBLIC_URL + "/signup"} component={asyncSignup} />
                    <Route path={process.env.PUBLIC_URL + "/resetPassword"} component={asyncPassword} />
                    <Route path={process.env.PUBLIC_URL + "/likes"} component={asyncLikes} />
                    <Route path={process.env.PUBLIC_URL + "/error"} component={asyncError} />
                </div>
                <Footer />
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        verified: state.authReducer.verified,
        isSignedIn: state.authReducer.isSignedIn,
        error: state.authReducer.error,
    };
};

export default connect(mapStateToProps)(App);