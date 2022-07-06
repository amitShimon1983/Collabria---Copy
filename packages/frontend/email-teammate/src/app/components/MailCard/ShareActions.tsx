import React, { useEffect } from 'react';
import { Callout, mixpanelEvent, useDeviceContext } from '@harmon.ie/collabria-frontend-shared';
import PotentialTaskView from '../PotentialTask/PotentialTaskView';
import { IconButton } from '@harmon.ie/collabria-frontend-storybook';

const ShareActions = ({ item, previewUrl, id, toggleIsCalloutVisible, isCalloutVisible }) => {
  const { isMobile: IsMobile, isTablet } = useDeviceContext();
  const isMobile = IsMobile && !isTablet;

  useEffect(() => {
    if (isCalloutVisible) {
      mixpanelEvent('Show Preview');
    }
  }, [isCalloutVisible]);

  const needToChangeIcon = isCalloutVisible && isMobile;
  return (
    <div className="share-actions">
      {previewUrl && (
        <IconButton
          className={`showpreview${id}`}
          iconProps={{ iconName: needToChangeIcon ? 'Cancel' : 'RedEye' }}
          title="Show Preview"
          styles={{ root: { cursor: 'pointer' }, rootHovered: { background: 'none' } }}
          ariaLabel="Show Preview"
          onClick={() => {
            toggleIsCalloutVisible();
          }}
        />
      )}
      {isCalloutVisible && !isMobile && (
        <Callout
          role="alertdialog"
          gapSpace={0}
          isBeakVisible={true}
          hidden={false}
          alignTargetEdge={true}
          target={`.showpreview${id}`}
          directionalHint={6}
          doNotLayer={false}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <PotentialTaskView
            email={item}
            actions={[]}
            onClose={() => {
              toggleIsCalloutVisible();
            }}
          />
        </Callout>
      )}
    </div>
  );
};

export default ShareActions;
