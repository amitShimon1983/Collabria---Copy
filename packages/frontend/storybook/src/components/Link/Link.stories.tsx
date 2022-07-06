import React from 'react';
import { ILinkProps, Stack } from '@fluentui/react';
import { Story } from '@storybook/react';
import Link from './Link';
export const Template: Story<ILinkProps> = (args: any) => {
  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Link href="https://developer.microsoft.com">html link</Link>
      <Link href="https://developer.microsoft.com" underline>
        html link underline
      </Link>
      <Link href="https://developer.microsoft.com" disabled>
        html link disabled
      </Link>
      <Link href="https://developer.microsoft.com" target="_blank">
        html link target
      </Link>
    </Stack>
  );
};

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'padded',
  },
};
