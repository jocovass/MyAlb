import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <NavLink to="/login" className="btn mr-small">Log in</NavLink>
    );
};

export default Login;