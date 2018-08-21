# React FormState

👔 Straight to business form state handling with validations for React.

## Getting Started (Basic 👌🏻)

Create a form state config:

```javascript
const formConfig = {
    // 'fullName' key defines our first input
    fullName: {
        displayName: 'Full Name',
    },
};
```

Create a component with a form input. The `name` attribute must match the form config, in this case `fullName`:

```javascript
const Form = props => (
    <input name="fullName" value={props.formValues.fullName} onChange={props.handleChange} />
);
```

Then wrap your component with the HOC by giving it a component and config:

```javascript
const FormWithState = withFormState(Form, formConfig);
```

That's captures the input of `fullName` and stores it in state while passing the `formValues` back down as props.

## Schema and Validations

@todo 🥔
