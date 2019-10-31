import React from 'react';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    return (<NavLink className="btn"
                     to="/signup" >
                Sign up
            </NavLink>);
};

export default Signup;