import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MessageBox } from '../../lib/MessageBox';
import { MessageBoxTypes } from '../../lib/MessageBoxTypes';

storiesOf('Components | MessageBox', module)
  .addParameters({
    info: {}
  })
  .add('Default', () => (
    <MessageBox
      type={select('type', Object.values(MessageBoxTypes), MessageBoxTypes.CONFIRM)}
      visible={boolean('visible', true)}
      onClose={action('onClose')}
      title={text('title', '')}
    >
      Message Box Content
    </MessageBox>
  ));
