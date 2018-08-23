import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withFormState from '../../src/withFormState';

// schemas
import basicValidation from '../../stories/schemas/basicValidation';

class TestForm extends Component {
    static propTypes = {
        clearFormState: PropTypes.func.isRequired,
        formSchema: PropTypes.object.isRequired,
        formState: PropTypes.object.isRequired,
        formValues: PropTypes.object.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        injectFormState: PropTypes.func.isRequired,
        isFormValid: PropTypes.bool.isRequired,
        validateForm: PropTypes.func.isRequired,
    };

    render() {
        const { handleChange, handleBlur, formState } = this.props;

        return (
            <div className="form">
                <input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formState.name.value}
                />
                <input
                    name="age"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formState.age.value}
                />
            </div>
        );
    }
}

export default withFormState(TestForm, basicValidation);
