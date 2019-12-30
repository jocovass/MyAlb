import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from  'redux-form';
import { sendPasswordResetEmail } from '../../store/actions/auth';
import { renderInput } from '../UI/Input/Input'
import { required, emailCheck } from '../../store/actions/validation';
import history from '../../history';
import Loader from '../UI/Loader/Loader';

const PasswordForm = (props) => {
    if(props.isSignedIn) {
        return <Redirect to="/" />;
    }
    return (
        <section className="form__wrapper">
            <h2 className="heading-secondary">Reset Your Password</h2>
            <p className="form__subtitle mb-small">Send a recovery email, update your password!</p>
            <form className="form"
                    onSubmit={props.handleSubmit(props.sendPasswordResetEmail)}
                >
                <Field name="email"
                        label="Email"
                        component={renderInput}
                        type="email"
                        validate={[required, emailCheck]} />
                { 
                    props.error && 
                    <strong className="validation-error">{ props.error }</strong> 
                }
                
                { 
                  props.submitSucceeded && !props.error
                    ? <strong className="validation-succeeded">Email has been sent!</strong>
                    : null
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
                    Send
                </button>
                <button className="btn"
                        onClick={history.goBack}>
                    Back
                </button>
            </form>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer.isSignedIn,
    }
}

const PasswordFormComp = connect(mapStateToProps, 
        { sendPasswordResetEmail })(PasswordForm);

export default reduxForm({
        form: 'resetPassword',
    })(PasswordFormComp);

