import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUserWithEmail } from '../../store/actions/auth';
import { required, requiredNum, minValue, emailCheck } from '../../store/actions/validation';
import { renderInput } from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';

const SignupForm = props => {
    if(props.isSignedIn) {
        return <Redirect to="/" />;
    }
    return (
        <section className="form__wrapper">
            <div className="form__section--bottom">
                <form className="form"
                        onSubmit={ props.handleSubmit(props.createUserWithEmail)} >
                    <Field name="name"
                           label="Full Name"
                           component={renderInput}
                           type="text"
                           validate={required} />
                    <Field name="email"
                            label="Email"
                            component={renderInput}
                            type="email"
                            validate={[required, emailCheck]} />
                    <Field name="password" 
                            label="Password" 
                            type="password"
                            component={renderInput} 
                            validate={[required, requiredNum, minValue]} />
                    { props.error && 
                    <strong className="validation-error">{ props.error }</strong> }
                    { props.submitting ? ( <div style={{
                                                width: '40px',
                                                height: "40px",
                                                margin: "0 auto 15px"
                                            }}>
                                                <Loader />
                                            </div> ) 
                                        : null }
                    <button className="btn mr-small" 
                            disabled={props.subbmitting}>
                                Sign up
                    </button>
                    <button className="btn" 
                            disabled={props.pristine || props.subbmitting}
                            onClick={props.reset}>
                                Clear
                    </button>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer.isSignedIn,
    };
}

const SignupComp = reduxForm({
    form: 'signupForm',
})(SignupForm);

export default connect(mapStateToProps, 
    { createUserWithEmail }
    )(SignupComp);