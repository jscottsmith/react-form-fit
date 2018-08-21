import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, isInvalid, errors, ...rest }) => (
    <div>
        <label>{label}</label>
        <div className="input-container">
            {isInvalid && (
                <div className="error">
                    {errors.map((err, i) => (
                        <span key={`${i}-error`}>{err}</span>
                    ))}
                </div>
            )}
            <input {...rest} className={isInvalid ? 'invalid' : ''} />
        </div>
    </div>
);

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    isInvalid: PropTypes.bool,
    errors: PropTypes.array,
};

export default Input;
