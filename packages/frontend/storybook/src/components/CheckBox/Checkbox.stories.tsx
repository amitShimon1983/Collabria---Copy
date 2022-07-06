import * as React from 'react';
import { ICheckboxProps, Stack, IStackProps, IStackStyles } from '@fluentui/react';
import { Story } from '@storybook/react';
import Checkbox from './Checkbox';
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const Template: Story<ICheckboxProps> = (args: any) => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <Checkbox {...args} label="Unchecked checkbox (uncontrolled)" />

        <Checkbox {...args} label="Checked checkbox (uncontrolled)" defaultChecked />

        <Checkbox {...args} label="Disabled checkbox" disabled />

        <Checkbox {...args} label="Disabled checked checkbox" disabled defaultChecked />
      </Stack>
      <Stack {...columnProps}></Stack>
    </Stack>
  );
};

export default {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'padded',
    controls: {
      include: ['indeterminate', 'boxSide', 'required'],
    },
  },
  argTypes: {
    indeterminate: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    required: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    boxSide: {
      defaultValue: 'start',
      control: { type: 'inline-radio', options: ['start', 'end'] },
    },
  },
};
