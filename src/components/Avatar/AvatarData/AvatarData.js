import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { onSignOut, deleteUser } from '../../../store/actions/auth';
import Modal from '../../Modal/Modal';

const AvatarData = (props) => {
    const [modal, setModal] = useState(false);
    const img = (
        props.userImgUrl ?
        <img className="avatar__userpic" alt="User profile img" 
             src={props.userImgUrl} /> : null
    )

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <React.Fragment>
        <div className="avatar__backdrop"
             onClick={props.onAvatarClick}>
        </div>
        <div className="avatar__data">
            <span className="triangle"></span>
            <ul className="avatar__list">
                <li className="avatar__item"
                    onClick={props.onAvatarClick} >
                    <NavLink to="/" className="avatar__btn">
                        {img}
                        {props.userName}
                    </NavLink>
                </li>
                <li className="avatar__item"
                    onClick={props.onAvatarClick} >
                    <NavLink to="/likes" className="avatar__btn">Likes</NavLink>
                </li>
                <li className="avatar__item"
                    onClick={props.onAvatarClick} >
                    <NavLink to="/" 
                             className="avatar__btn"
                             onClick={props.onSignOut}>
                        Logout
                    </NavLink>
                </li>
                <li className="avatar__item">
                    <NavLink to="/" 
                             className="avatar__btn"
                             onClick={() => setModal(true)}>
                        Delete
                    </NavLink>
                </li>
            </ul>
        </div>
        {
            modal 
            ? <Modal title="Do you want to delete your account?" 
                     delete={props.deleteUser} 
                     cancel={toggleModal}
                     onAvatarClick={props.onAvatarClick} /> 
            : null
        }
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        userName: state.authReducer.userName,
        userImgUrl : state.authReducer.userImgUrl
    }
};

export default connect(mapStateToProps, { onSignOut, deleteUser })(AvatarData);