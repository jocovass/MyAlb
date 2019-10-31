import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../components/Logo/Logo';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import Loader from '../../components/UI/Loader/Loader';
import Avatar from '../../components/Avatar/Avatar';
import { app } from '../../config/firebase';
import { onAuthChange } from '../../store/actions/auth';

class Header extends React.Component {
    componentDidMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged(user => {
            this.props.onAuthChange(!!user, user);
        });
    }

    render() {
        let nav = null;
        if(this.props.isSignedIn === null) {
            nav = <Loader width="40px"
                          height="40px"
                          top="0" 
                          left="0"
                          transform="translate(-100%,-50%)"/>;
        } else if(this.props.isSignedIn) {
            nav = <Avatar />
        } else {
            nav = (
                <div>
                    <Login />
                    <Signup />
                </div>
            );
        }

        return (
            <header className="header">
                <div className="header__container">
                    <Logo />
                    <div style={{ position: "relative" }}>
                        { nav }
                    </div>
                </div>
            </header>
        );
        
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer.isSignedIn,
    };
};

export default connect(
                mapStateToProps, 
                { onAuthChange })(Header);