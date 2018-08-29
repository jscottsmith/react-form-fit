import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, isInvalid, checked, name, errors, ...rest }) => (
    <div className="input-container input-checkbox">
        {isInvalid && (
            <div className="error">
                {errors.map((err, i) => (
                    <span key={`${i}-error`}>{err}</span>
                ))}
            </div>
        )}
        <input
            {...rest}
            id={name}
            checked={checked}
            name={name}
            type="checkbox"
            className={isInvalid ? 'invalid' : ''}
        />
        <label htmlFor={name}>{label}</label>
    </div>
);

CheckboxInput.defaultProps = {
    type: 'checkbox',
};

CheckboxInput.propTypes = {
    errors: PropTypes.array,
    isInvalid: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default CheckboxInput;
