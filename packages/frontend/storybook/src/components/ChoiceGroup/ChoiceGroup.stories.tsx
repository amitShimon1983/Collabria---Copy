import * as React from 'react';
import { Stack, IStackStyles, IChoiceGroupOption, IChoiceGroupProps, Icon, Label } from '@fluentui/react';
import { Story } from '@storybook/react';
import ChoiceGroup from './ChoiceGroup';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];
const iconOptions: IChoiceGroupOption[] = [
  { key: 'day', text: 'Day', iconProps: { iconName: 'CalendarDay' } },
  { key: 'week', text: 'Week', iconProps: { iconName: 'CalendarWeek' } },
  { key: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];

export const Template: Story<IChoiceGroupProps> = (args: any) => {
  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <ChoiceGroup {...args} defaultSelectedKey="B" options={options} label="Pick one" />
      <ChoiceGroup {...args} defaultSelectedKey="bar" options={iconOptions} label="Pick one image" />
      <div>
        <Label>
          <Stack horizontal verticalAlign="center">
            <span>Custom label&nbsp;&nbsp;</span>
            <Icon iconName="Filter" />
          </Stack>
        </Label>
        <ChoiceGroup {...args} defaultSelectedKey="B" options={options} />
      </div>
    </Stack>
  );
};

export default {
  title: 'Components/ChoiceGroup',
  parameters: {
    layout: 'padded',
    controls: {
      include: ['disabled', 'required'],
    },
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    required: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};
