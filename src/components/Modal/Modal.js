import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    const onCancelClick = () => {
        props.cancel();
        props.onAvatarClick();
    }

    const onDeleteClick = () => {
        props.onAvatarClick();
        props.cancel();
        props.delete();
    }

    return ReactDOM.createPortal(
            <div className="modal"
                 onClick={props.cancel}>
                <div className="modal__content">
                    <h2 className="heading-secondary mb-small">{props.title}</h2>
                    <button className="btn btn--danger mr-xsmall" onClick={onDeleteClick}>Delete</button>
                    <button className="btn" onClick={onCancelClick}>Cancel</button>
                </div>
            </div>,
            document.querySelector('#modal')
    );
};

export default Modal;