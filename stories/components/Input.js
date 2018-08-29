import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, label, isInvalid, errors, ...rest }) => (
    <div className={`input-${type}`}>
        {label && <label>{label}</label>}
        <div className="input-container">
            {isInvalid && (
                <div className="error">
                    {errors.map((err, i) => (
                        <span key={`${i}-error`}>{err}</span>
                    ))}
                </div>
            )}
            <input {...rest} type={type} className={isInvalid ? 'invalid' : ''} />
        </div>
    </div>
);

Input.defaultProps = {
    type: 'input',
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    isInvalid: PropTypes.bool,
    errors: PropTypes.array,
};

export default Input;
