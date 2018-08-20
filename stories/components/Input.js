import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, isInvalid, errors, ...rest }) => (
    <div>
        <label>{label}</label>
        {isInvalid &&
            errors.map((err, i) => (
                <div key={`${i}-error`} className="error">
                    {err}
                </div>
            ))}
        <input {...rest} />
    </div>
);

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    isInvalid: PropTypes.bool,
    errors: PropTypes.array,
};

export default Input;
