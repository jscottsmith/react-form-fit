import React from 'react';
import FormSchema from '../src/FormSchema';

describe('FormSchema', () => {
    it('creates a schema', () => {
        let _schema;

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
                {schema => {
                    _schema = schema;
                }}
            </FormSchema>
        );

        expect(_schema).toEqual({
            name: {
                displayName: 'Name',
                initialValue: '',
                isRequired: true,
                validations: [],
                name: 'name',
            },
            age: {
                displayName: 'Age',
                initialValue: '',
                isRequired: true,
                validations: [],
                name: 'age',
            },
        });
    });
});
