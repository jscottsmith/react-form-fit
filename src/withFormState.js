import React from 'react';
import FormInternalState from './FormInternalState';
import { createSchema } from './createSchema';

const withFormState = (Wrapped, schema) => {
    const FormStateWrapper = wrapperProps => (
        <FormInternalState schema={createSchema(schema)} formKeys={Object.keys(schema)}>
            {props => <Wrapped {...props} {...wrapperProps} />}
        </FormInternalState>
    );
    return FormStateWrapper;
};

export default withFormState;
