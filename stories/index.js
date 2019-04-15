import React from 'react';
import './styles.scss';
import { storiesOf } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';

import { BasicForm, NoValidationForm, InjectForm } from './components/Form';
import DynamicFormContainer from './components/DynamicFormContainer';

storiesOf('withFormState', module)
    .add('no validation', () => <NoValidationForm handleSubmit={action('form submit')} />)
    .add('validated inputs', () => <BasicForm handleSubmit={action('form submit')} />)
    .add('inject form state', () => <InjectForm handleSubmit={action('form submit')} hasInject />)
    .add('dynamic schema', () => <DynamicFormContainer handleSubmit={action('form submit')} />);
