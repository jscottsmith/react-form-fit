import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

import './Form.scss';

class Form extends Component {
    static propTypes = {
        clearFormState: PropTypes.func.isRequired,
        formSchema: PropTypes.object.isRequired,
        formState: PropTypes.object.isRequired,
        formValues: PropTypes.object.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        injectFormState: PropTypes.func.isRequired,
        isFormValid: PropTypes.bool.isRequired,
        validateForm: PropTypes.func.isRequired,
    };

    handleSubmit = () => {
        if (this.props.validateForm()) {
            this.props.handleSubmit('VALID FORM', this.props.formValues);
        } else {
            this.props.handleSubmit('INVALID FORM', this.props.formValues);
        }
    };

    render() {
        // with form state HOC props
        const {
            handleChange,
            handleBlur,
            formState,
            formSchema,
            formKeys,
            isFormValid,
            addItem,
            removeItem,
        } = this.props;

        return (
            <div className="form">
                {formKeys.map(formKey => (
                    <TextInput
                        key={formKey}
                        name={formKey}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={formSchema[formKey].displayName}
                        value={formState[formKey].value}
                        errors={formState[formKey].errors}
                        isInvalid={formState[formKey].isInvalid}
                    />
                ))}

                <button onClick={addItem}>Add</button>
                <button onClick={removeItem}>Remove</button>
                <button disabled={!isFormValid} onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Form;
