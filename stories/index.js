import React from 'react';
import './styles.scss';
import { storiesOf } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';

import Form from './components/Form';

storiesOf('Form', module).add('with basic inputs', () => (
    <Form handleSubmit={action('form submit')} />
));
