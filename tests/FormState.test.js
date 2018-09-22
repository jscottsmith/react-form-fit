import React from 'react';
import TestForm from './components/TestForm';
import FormSchema from '../src/FormSchema';
import FormInternalState from '../src/FormInternalState';

const createEventObject = options => ({ target: { type: 'input', ...options } });

let _schema;
let _keys;

describe('FormInternalState', () => {
    beforeEach(() => {
        shallow(
            <FormSchema
                schema={{
                    name: {
                        displayName: 'Name',
                    },
                    age: {
                        displayName: 'Age',
                        validations: [{ test: val => val >= 21, error: 'nope' }],
                    },
                }}>
                {(schema, keys) => {
                    _schema = schema;
                    _keys = keys;
                }}
            </FormSchema>
        );
    });

    it('handles input changes', () => {
        const wrapper = mount(
            <FormInternalState schema={_schema} formKeys={_keys}>
                {props => <TestForm {...props} />}
            </FormInternalState>
        );

        expect(wrapper.state().name.value).toEqual('');
        const nameInput = wrapper.find('input[name="name"]');

        nameInput.simulate('change', createEventObject({ value: 'john', name: 'name' }));
        expect(wrapper.state().name.value).toEqual('john');
    });

    it('validates on blur', () => {
        const wrapper = mount(
            <FormInternalState schema={_schema} formKeys={_keys}>
                {props => <TestForm {...props} />}
            </FormInternalState>
        );

        const nameInput = wrapper.find('input[name="name"]');
        nameInput.simulate('blur', createEventObject({ value: 'Sally', name: 'name' }));

        const ageInput = wrapper.find('input[name="age"]');
        ageInput.simulate('blur', createEventObject({ value: 18, name: 'age' }));

        expect(wrapper.state().name.value).toEqual('Sally');
        expect(wrapper.state().name.isInvalid).toEqual(false);
        expect(wrapper.state().age.value).toEqual(18);
        expect(wrapper.state().age.isInvalid).toEqual(true);
    });

    it('validates on change when invalid', () => {
        const wrapper = mount(
            <FormInternalState schema={_schema} formKeys={_keys}>
                {props => <TestForm {...props} />}
            </FormInternalState>
        );

        const nameInput = wrapper.find('input[name="name"]');
        nameInput.simulate('blur', createEventObject({ value: '', name: 'name' }));

        expect(wrapper.state().name.value).toEqual('');
        expect(wrapper.state().name.isInvalid).toEqual(true);

        nameInput.simulate('change', createEventObject({ value: 'Sally', name: 'name' }));
        expect(wrapper.state().name.value).toEqual('Sally');
        expect(wrapper.state().name.isInvalid).toEqual(false);
    });

    // it('validates on change when invalid', () => {});
});
