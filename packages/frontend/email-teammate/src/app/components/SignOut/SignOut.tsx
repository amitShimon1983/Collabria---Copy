import React, { useCallback } from 'react';
import './SignOut.scss';
import { useBoolean } from '@uifabric/react-hooks';
import { IconButton, mixpanelEvent, Modal } from '@harmon.ie/collabria-frontend-shared';
import { H2, H4, Spinner, Text } from '@harmon.ie/collabria-frontend-storybook';
import { DefaultButton } from '@harmon.ie/collabria-frontend-shared/src/components/atoms/fluent/button';

const SignOut = ({ expanded = false }) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [loggingOut, { setTrue: logOut }] = useBoolean(false);
  const doLogout = useCallback(
    e => {
      mixpanelEvent('Sign Out');
      logOut();
      e.stopPropagation();
    },
    [logOut]
  );

  return (
    <>
      {!expanded && (
        <IconButton
          iconProps={{ iconName: 'SignOut' }}
          ariaLabel="Sign Out"
          onClick={showModal}
          styles={{
            icon: { margin: 0, fontSize: 20 },
            root: { marginBottom: 5, marginLeft: 22 },
          }}
        />
      )}
      <Modal isOpen={isModalOpen} onDismiss={hideModal} isBlocking={false}>
        <div className="modal-dialog">
          {loggingOut ? (
            <div className="modal-loading">
              <Spinner label="Signing out..." />
            </div>
          ) : (
            <>
              <div className="modal-title">
                <Text level="large">
                  &emsp;
                  <H2> Sign out</H2>
                </Text>
              </div>
              <div className="modal-text">
                <Text level="mediumPlus">
                  &emsp;
                  <H2> Are you sure you want to sign out?</H2>
                </Text>
              </div>
              <div className="modal-buttons">
                <DefaultButton onClick={hideModal}>No</DefaultButton>
                <DefaultButton className="modal-yes" primary={true} onClick={doLogout}>
                  Yes
                </DefaultButton>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SignOut;
