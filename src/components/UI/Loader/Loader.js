import React from 'react';

const Loader = props => {
    const { width, height, top, left, transform } = props
    return (
        <div className="loader-container"
             style={{
                 width, height, top, left, transform
             }}>
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Loader;

