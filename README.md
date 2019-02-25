# React Form Fit [![Build Status](https://travis-ci.org/jscottsmith/react-form-fit.svg?branch=master)](https://travis-ci.org/jscottsmith/react-form-fit)

👔 Form-fitting and straight to business state handling with validation for React form inputs.

Try it on for size: [Storybook](https://react-form-fit.surge.sh/)

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

That captures the input of `fullName` and stores it in state while passing the `formValues` back down to your wrapped component as props.

## Form Configuration

The higher order component takes a config file that will define the form fields and validations.

```javascript
withFormState(Wrapped, config);
```

Here's what a complete config might look like for a form with a few fields with different requirements:

```javascript
const config = {
    firstName: {
        displayName: 'First Name',
    },
    lastName: {
        displayName: 'Last Name',
        isRequired: false,
    }
    age: {
        displayName: 'Age',
        validations: [
            {
                test: val => val >= 18,
                error: 'Must be 18 years or older.'
            },
            {
                test: val => val < 120,
                error: 'Are you really that old?'
            },
        ]
    },
}
```

Each object key will represent a unique input, and must match the `name` attribute on the input it's controlling. Here's the possible configuration for each input:

| Key            | type      | Default | Description                                                                                      |
| -------------- | --------- | ------- | ------------------------------------------------------------------------------------------------ |
| `displayName`  | `String`  |         | Display name is the name that will be used in error messages when `isRequired` is `true`         |
| `initialValue` | `String`  | `''`    | This is the initial value that the form state will be set to                                     |
| `isRequired`   | `Boolean` | `true`  | Indicates if the field is required                                                               |
| `validations`  | `Array`   |         | An array of objects that contain a `test` function and `error` message. [See here](#validations) |

## Higher Order Component

The higher order component provides the following props to a wrapped component

| Prop              | type       | Description                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `clearFormState`  | `Function` | Clears values and errors from the form state                       |
| `formKeys`        | `Array`    | A list of all keys based on the form schema                        |
| `formSchema`      | `Object`   | The config used to define the form state                           |
| `formState`       | `Object`   | State of the form including values and errors                      |
| `formValues`      | `Object`   | Object containing all the values mapped to the form keys           |
| `handleBlur`      | `Function` | The `onBlur` event handler for inputs                              |
| `handleChange`    | `Function` | The `onChange` event handler for inputs                            |
| `injectFormState` | `Function` | Injects form values into state to override any existing values     |
| `isFormValid`     | `Boolean`  | Boolean indicating if the form is passing validations              |
| `validateForm`    | `Function` | Applies validation function to all inputs and updates error states |

## Validations

Within a config, the `validations` key describes all the tests to validate an input. Tests are functions that take a value and return a boolean. If a test returns `true` it's passing, if `false` the input will be marked `isInvalid` and `errors` will be updated to contain messages of the failing tests.

Here's an example of validations for an age form field:

```javascript
const config = {
    age: {
        displayName: 'Age',
        validations: [
            {
                test: val => val >= 18,
                error: 'Must be 18 years or older.',
            },
            {
                test: val => val < 120,
                error: 'Are you really that old?',
            },
        ],
    },
};
```

### Component Error Handling

Within the `formState` prop you will have access to the the `isInvalid` boolean and `errors` array on each form key. If any of the tests have failed. Form input will first be validated once the `onBlur` event is called. If the input has been focused before and is invalid, it will be validated again on each change. **You must** add the `props.handleBlur` function if you plan to validate input.

```javascript
const ValidInput = props => (
    <Fragment>
        <input
            name="age"
            value={props.formValues.age}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
        {props.formState.isInvalid && (
            <p className="input-errors">{props.formState.age.errors.join(', ')}</p>
        )}
    </Fragment>
);
```

### Validating an Entire Form

Form state provides the `isFormValid` boolean as a prop which indicate if _all fields_ have passed validations and include input if `isRequired`.

```js
const formConfig = {
    fullName: {
        displayName: 'Full Name',
    },
    age: {
        displayName: 'Age',
        validations: [
            {
                test: val => val >= 18,
                error: 'Must be 18 years or older.',
            },
            {
                test: val => val < 120,
                error: 'Are you really that old?',
            },
        ],
    },
};
```

Given the above form config, we disable the submit `<button>` when the `isFormInvalid` is true so the form cannot be sent by a user.

```js
const ValidInput = ({
    handleChange,
    handleBlur,
    formValues,
    formState,
    isFormInvalid,
    submitHandler, // not provided by Form State
}) => (
    <form>
        <input name="name" value={formValues.name} onChange={handleChange} onBlur={handleBlur} />
        {formState.name.isInvalid && (
            <p className="input-errors">{formState.name.errors.join(', ')}</p>
        )}
        <input name="age" value={formValues.age} onChange={handleChange} onBlur={handleBlur} />
        {formState.age.isInvalid && (
            <p className="input-errors">{formState.age.errors.join(', ')}</p>
        )}
        <button disabled={isFormInvalid} onClick={submitHandler}>
            Submit
        </button>
    </form>
);
```
