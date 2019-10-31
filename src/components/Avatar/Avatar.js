import React, { useState } from 'react';
import avatar from '../../img/avatar.png';
import AvatarData from './AvatarData/AvatarData';

const Avatar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onAvatarClick = () => {
        setIsOpen(!isOpen);
    }

    const renderAvatarData = () => {
        let data = null;
        if(isOpen) {
            data = <AvatarData onAvatarClick={onAvatarClick} />;
        }
        return data;
    }
    return (
        <div className="avatar__container">
            <img className="avatar_pic" 
                 alt="User avatar" 
                 src={avatar}
                 onClick={onAvatarClick} />
            { renderAvatarData() }
        </div>
    );
};

export default Avatar;