import React from 'react';

function Alert({ type, text }) {
    return (
        <div>
            <div className={`alert alert-${type}`}>{text}</div>
        </div>
    )
}

export default Alert;