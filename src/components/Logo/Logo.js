import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../img/logo.png';

const Logo = () => {
    return (
        <div className="logo-container">
            <NavLink to='/'>
                <img className="logo" src={logo} alt="This is a logo" />
            </NavLink>
        </div>
    );
};

export default Logo;