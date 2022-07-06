import React, { ChangeEvent, useCallback, useState } from 'react';
import { Dialog as FabricDialog, DialogFooter, IDialogProps } from '@fluentui/react/lib/Dialog';
import { ConfirmButtons, ConfirmButtonsProps } from '../ConfirmButtons';

export interface DialogProps extends IDialogProps {
  footerProps?: ConfirmButtonsProps;
}

const Dialog: React.FC<DialogProps> = ({ onDismiss, hidden, footerProps, children, ...rest }) => {
  const { onCancel, onOK, ...footerRest } = footerProps || {};

  const onDialogDismiss = useCallback(() => {
    onDismiss && onDismiss();
  }, []);

  const onFooterOk = useCallback((e: ChangeEvent<any>) => {
    onOK && onOK(e);
    onDismiss && onDismiss();
  }, []);

  const onFooterCancel = useCallback((e: ChangeEvent<any>) => {
    onCancel && onCancel(e);
    onDismiss && onDismiss();
  }, []);

  return (
    <FabricDialog hidden={hidden} onDismiss={onDialogDismiss} {...rest}>
      {children}
      {footerProps && (
        <DialogFooter>
          <ConfirmButtons {...footerRest} onOK={onFooterOk} onCancel={onFooterCancel} />
        </DialogFooter>
      )}
    </FabricDialog>
  );
};

export default Dialog;
