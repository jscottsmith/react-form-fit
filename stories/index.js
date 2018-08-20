import React from 'react';
import './styles.scss';
import { storiesOf } from '@storybook/react';

import Form from './components/Form';

storiesOf('Form', module).add('with basic inputs', () => <Form />);
