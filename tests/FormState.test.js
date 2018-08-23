import React from 'react';
import TestForm from './components/TestForm';
import FormSchema from '../src/FormSchema';
import FormInternalState from '../src/FormInternalState';

const createEventObject = options => ({ target: { type: 'input', ...options } });

describe('FormInternalState', () => {
    it('handles input changes', () => {
        let schema;

        shallow(
            <FormSchema
                schema={{
                    name: {
                        displayName: 'Name',
                    },
                    age: {
                        displayName: 'Age',
                    },
                }}>
                {createdSchema => {
                    schema = createdSchema;
                }}
            </FormSchema>
        );

        const wrapper = mount(
            <FormInternalState schema={schema}>
                {props => <TestForm {...props} />}
            </FormInternalState>
        );

        expect(wrapper.state().name.value).toEqual('');
        const nameInput = wrapper.find('input[name="name"]');

        nameInput.simulate('change', createEventObject({ value: 'john', name: 'name' }));
        expect(wrapper.state().name.value).toEqual('john');
    });
    it('validates on blur', () => {});
    it('validates on change when invalid', () => {});
});
