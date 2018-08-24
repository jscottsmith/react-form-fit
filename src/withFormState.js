import React from 'react';
import FormInternalState from './FormInternalState';
import FormSchema from './FormSchema';

const withFormState = (Wrapped, schemaConfig) => {
    const FormStateWrapper = wrapperProps => (
        <FormSchema schema={schemaConfig}>
            {(schema, formKeys) => (
                <FormInternalState schema={schema} formKeys={formKeys}>
                    {props => <Wrapped {...props} {...wrapperProps} />}
                </FormInternalState>
            )}
        </FormSchema>
    );
    return FormStateWrapper;
};

export default withFormState;
