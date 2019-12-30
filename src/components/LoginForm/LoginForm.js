import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { onSignInWithFacebook, signInWithEmail } from '../../store/actions/auth';
import { required, requiredNum, minValue, emailCheck } from '../../store/actions/validation';
import { renderInput } from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';

const LoginForm = props => {
    const onSignInWithFacebookClick = () => {
        props.onSignInWithFacebook();
    }

    if(props.isSignedIn) {
        return <Redirect to="/" />;
    }

    return (
        <section className="form__wrapper">
            <div className="form__section--top">
                <button className="btn"
                        onClick={onSignInWithFacebookClick}>
                    Login with Facebook
                </button>
            </div>
            <div className="mt-medium mb-xsmall">
                <form className="form"
                        onSubmit={props.handleSubmit(props.signInWithEmail)}
                    >
                    <Field name="email"
                            label="Email"
                            component={renderInput}
                            type="email"
                            validate={[required, emailCheck]} />
                    <Field name="password" 
                            label="Password" 
                            type="password"
                            component={renderInput} 
                            validate={[required, minValue, requiredNum]} />
                    { 
                        props.error && 
                        <strong className="validation-error">{ props.error }</strong> 
                    }
                    { props.submitting ? ( <div style={{
                                                width: "40px",
                                                height: "40px",
                                                margin: "0 auto 15px",
                                                position: "relative",
                                            }}>
                                                <Loader width="100%"
                                                        height="100%"
                                                        top="0"
                                                        left="0"
                                                        transform="translate(0%,0%)"/>
                                            </div> ) 
                                        : null }
                    <button className="btn mr-small" 
                            disabled={props.subbmitting}>
                                Log in
                    </button>
                    <button className="btn" 
                            disabled={props.pristine || props.subbmitting}
                            onClick={props.reset}>
                                Clear
                    </button>
                </form>
            </div>
            <NavLink to="/resetPassword" className="btn__link">Forgot your Password?</NavLink>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer.isSignedIn,
    };
}

const LogInComp = connect(mapStateToProps, 
    { onSignInWithFacebook, signInWithEmail }
    )(LoginForm);

export default reduxForm({
    form: 'loginForm',
})(LogInComp);