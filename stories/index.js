import React from 'react';
import './styles.scss';
import { storiesOf } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';

import { BasicForm, NoValidationForm } from './components/Form';

storiesOf('withFormState', module)
    .add('with inputs and no validation', () => (
        <NoValidationForm handleSubmit={action('form submit')} />
    ))
    .add('with basic validated inputs', () => <BasicForm handleSubmit={action('form submit')} />);
