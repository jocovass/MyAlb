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
                    <Route path="/" exact component={Search} />
                    { warn }
                    <Route path="/" exact component={Gallery} />
                    <Route path="/login" component={asyncLogin} />
                    <Route path="/signup" component={asyncSignup} />
                    <Route path="/resetPassword" component={asyncPassword} />
                    <Route path="/likes" component={asyncLikes} />
                    <Route path="/error" component={asyncError} />
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