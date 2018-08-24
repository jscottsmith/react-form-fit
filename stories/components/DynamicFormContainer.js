import React, { Component } from 'react';
import FormState from '../../src/FormState';
import DynamicForm from './DynamicForm';

export default class DynamicFormContainer extends Component {
    state = {
        items: 1,
    };

    addItem = () => this.setState(({ items }) => ({ items: items + 1 }));

    removeItem = () => this.setState(({ items }) => ({ items: items > 0 ? items - 1 : 0 }));

    getSchema() {
        return Array(this.state.items)
            .fill({})
            .reduce((a, c, i) => {
                a[`item${i}`] = {
                    displayName: `Item #${i + 1}`,
                    initialValue: 'Foo',
                };
                return a;
            }, {});
    }

    render() {
        return (
            <FormState schema={this.getSchema()}>
                {props => (
                    <DynamicForm
                        {...this.props}
                        {...props}
                        addItem={this.addItem}
                        removeItem={this.removeItem}
                    />
                )}
            </FormState>
        );
    }
}
