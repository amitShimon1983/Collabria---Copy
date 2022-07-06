import React from 'react';
import { Stack } from '@fluentui/react';
import ConfirmButtons, { ConfirmButtonsProps } from './ConfirmButtons';
import { Box } from '../Box';
import { Story } from '@storybook/react';

export const Template: Story<ConfirmButtonsProps> = (args: any) => (
  <Stack tokens={{ childrenGap: 4 }}>
    <Box bordered padding="md" width="100%">
      <ConfirmButtons {...args} />
    </Box>
  </Stack>
);

export default {
  title: 'Components/ConfirmButtons',
  component: Text,
  parameters: {
    layout: 'padded',
    controls: { include: ['cancelText', 'okText', 'showCancel', 'loading', 'disabled', 'justify'] },
  },
  argTypes: {
    justify: {
      options: ['flex-start', 'center', 'flex-end'],
      control: { type: 'radio' },
    },
    showCancel: {
      defaultValue: true,
      control: { type: 'inline-radio', options: [false, true] },
    },
    loading: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'inline-radio', options: [false, true] },
    },
    cancelText: {
      defaultValue: '',
      control: { type: 'text' },
    },
    okText: {
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};
