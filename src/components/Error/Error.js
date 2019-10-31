import React from 'react';
import { connect } from 'react-redux';
import errorImg from '../../img/error.png'
import history from '../../history';
import { destroyLoader } from '../../store/actions/ui';

const Error = (props) => {
    const error = props.errorSearch || props.errorAuth;
    const onBackClick = () => {
        props.destroyLoader();
        history.goBack()
    }
    return (
        <section className="error-global">
            <div className="error-global__message">
                <h2 className="heading-secondary center">{ error }</h2>
            </div>
            <div className="error-global__picture">
                <img className="error-global__image" src={errorImg} alt="not found error png" />
            </div>
            <button className="btn"
                    onClick={onBackClick}>Back</button>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        errorAuth: state.authReducer.error,
        errorSearch: state.fetchReducer.error,
    };
};

export default connect(mapStateToProps, { destroyLoader })(Error);