import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../../store/actions/auth';
import svg from '../../img/sprite.svg';

const VerificationWarning = (props) => {
    const [emailSent, setEmailSent] = useState(false);

    const onSendClick = () => {
        props.sendEmailVerification();
        setEmailSent(true);
    }

    const renderConfirmation = () => {
        return (
            <div className="warning__footer">
                <div className="warning__left-side">
                    <svg className="warning__icon warning__icon-check">
                        <use xlinkHref={`${svg}#icon-check-square-o`}></use>
                    </svg>
                </div>
                <div className="warning__right-side">
                    <p className="warning__text sent">Your email has been sent.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="warning">
            <div className="warning__left-side">
                <svg className="warning__icon warning__icon-triangle">
                    <use xlinkHref={`${svg}#icon-warning`}></use>
                </svg>
            </div>
            <div className="warning__right-side">
                <div className="warning__title">
                    <h3 className="heading-tertiary">Warning!</h3>
                </div>
                <div className="warning__body">
                    <p className="warning__text">Please verify your email address!</p>
                    <button className="btn__link"
                            onClick={onSendClick}>Resend email</button>
                </div>
                { emailSent ? renderConfirmation() : null }
            </div>
        </div>
    );
};

export default connect(null, { sendEmailVerification })(VerificationWarning);