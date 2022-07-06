import React, { ChangeEvent, CSSProperties, MouseEventHandler } from 'react';
import { IButtonStyles, Stack } from '@fluentui/react';
import { Button } from '../Button';
import { Box, IBox } from '../Box';

export interface ConfirmButtonsProps extends IBox {
  cancelText?: string;
  okText?: string;
  onCancel?: (e: ChangeEvent<any>) => void;
  onOK?: (e: ChangeEvent<any>) => void;
  showCancel?: boolean;
  loading?: boolean;
  disabled?: boolean;
  justify?: string;
  okButtonStyle?: CSSProperties;
  cancelButtonStyle?: CSSProperties;
}

const ConfirmButtons = ({
  cancelText,
  onCancel,
  okText,
  onOK,
  showCancel = true,
  loading,
  disabled,
  justify = 'flex-end',
  okButtonStyle,
  cancelButtonStyle,
  ...rest
}: ConfirmButtonsProps) => {
  return (
    <Box justify={justify} width="100%" {...rest}>
      <Stack tokens={{ childrenGap: 10 }} horizontal>
        {showCancel && (
          <Button data-cy="CancelButton" onClick={onCancel} allowDisabledFocus style={okButtonStyle}>
            {cancelText || 'Cancel'}
          </Button>
        )}
        <Button
          data-cy="SaveButton"
          primary
          disabled={disabled}
          onClick={onOK}
          loading={loading}
          style={cancelButtonStyle}
        >
          {okText || 'OK'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmButtons;
