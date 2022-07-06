import React, { useCallback, useState } from 'react';
import { IToggleProps, Stack } from '@fluentui/react';
import { Meta, Story } from '@storybook/react';
import Dialog from './Dialog';
import { Button } from '../Button';

export const Template: Story<IToggleProps> = () => {
  const [visible, setVisible] = useState<boolean | undefined>(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <>
      <Button secondaryText="Opens the Sample Dialog" onClick={() => setVisible(true)} text="Open Dialog" />
      <Stack tokens={{ childrenGap: 10 }}>
        <Dialog title="Default Dialog" footerProps={{ showCancel: false }} hidden={!visible} onDismiss={onDismiss}>
          <div>
            Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where
            you want to teach the user something or notify them of an important change.
          </div>
        </Dialog>
      </Stack>
    </>
  );
};

export default {
  title: 'Components/Dialog',
  parameters: {
    layout: 'padded',
  },
} as Meta;
