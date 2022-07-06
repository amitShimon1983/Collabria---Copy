import React, { useRef } from 'react';
import ShareActions from './ShareActions';
import classes from './MailCardMobile.module.scss';
import { getFileTypeIconProps, Icon, useCustomizations, useDeviceContext } from '@harmon.ie/collabria-frontend-shared';
import { IconButton, Persona } from '@harmon.ie/collabria-frontend-storybook';
import {
  getFileExtension,
  getRelativeDisplayDate,
  humanFileSize,
} from '@harmon.ie/collabria-frontend-shared/src/utils';
import Drawer from '../drawer/drawer';
import PotentialTaskView from '../PotentialTask/PotentialTaskView';

const MailCardMobile = ({
  selectedMail,
  onRemoveAttachment,
  removedAttachmentsIds,
  isCalloutVisible,
  toggleIsCalloutVisible,
}) => {
  const parentRef = useRef(null);
  const { isMobile } = useDeviceContext();
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;
  if (!selectedMail) {
    return <></>;
  }

  const attachmentsToDisplay = ((selectedMail && selectedMail.attachments) || []).filter(
    attachment => !attachment.isInline && !removedAttachmentsIds.includes(attachment.attachmentId)
  );
  const label = selectedMail?.toRecipients
    ?.map(({ emailAddress }) => emailAddress.name || emailAddress.address)
    .join(', ');
  const displayPreviewAsFullPage = isMobile && isCalloutVisible;
  return (
    <>
      <div className="mail-card-mobile" ref={parentRef}>
        <EmailPreview
          isMobile={isMobile}
          palette={palette}
          selectedMail={selectedMail}
          label={label}
          attachmentsToDisplay={attachmentsToDisplay}
          onRemoveAttachment={onRemoveAttachment}
          toggleIsCalloutVisible={toggleIsCalloutVisible}
          isCalloutVisible={isCalloutVisible}
        />
        <Drawer isOpen={displayPreviewAsFullPage}>
          <PotentialTaskView
            needToRender={displayPreviewAsFullPage}
            isMobile={isMobile}
            email={selectedMail}
            actions={[]}
            onClose={() => {
              console.log('mobile');
            }}
          />
        </Drawer>
      </div>
    </>
  );
};

export default MailCardMobile;
function EmailPreview({
  palette,
  selectedMail,
  label,
  attachmentsToDisplay,
  onRemoveAttachment,
  toggleIsCalloutVisible,
  isCalloutVisible,
  isMobile,
}) {
  const blurOnMobile = isCalloutVisible && isMobile;
  const profileFromPic = '';
  return (
    <>
      <div
        className="main"
        style={{
          backgroundColor: palette.themeLighterAlt,
        }}
      >
        <div className={`side ${blurOnMobile && classes?.isOpen}`}>
          <Persona imageUrl={profileFromPic || ''} text={selectedMail?.from?.emailAddress?.name || ''} />
        </div>
        <div style={isMobile ? { width: '80%' } : {}} className="content">
          <ShareActions
            id={'share-actions'}
            item={selectedMail}
            previewUrl={selectedMail?.webLink || ''}
            toggleIsCalloutVisible={toggleIsCalloutVisible}
            isCalloutVisible={isCalloutVisible}
          />
          <div className={`title ${blurOnMobile && classes?.isOpen}`}>{selectedMail?.subject}</div>
          <div className={`sent-date ${blurOnMobile && classes.isOpen}`}>
            {getRelativeDisplayDate(new Date(selectedMail.sentDateTime))}
          </div>
          <div className="addressees from">
            <label>From:</label> {selectedMail?.from?.emailAddress?.name}
          </div>
          <div className="addressees from">
            <label>To:</label> {label}
          </div>
          <div className="preview" style={{ overflow: 'hidden' }}>
            {selectedMail.bodyPreview}
          </div>
        </div>
      </div>
      {!!attachmentsToDisplay.length && (
        <div className="attachments">
          <div style={{ overflowY: 'scroll', maxHeight: '270px' }}>
            {attachmentsToDisplay.map((attachment, n) => (
              <div key={n} className="attachment" style={{ backgroundColor: palette.themeLighterAlt }}>
                <div className="icon">
                  <Icon
                    {...getFileTypeIconProps({
                      extension:
                        attachment.type === '#microsoft.graph.itemAttachment'
                          ? 'eml'
                          : getFileExtension(attachment.name),
                      size: 40,
                      imageFileType: 'png',
                    })}
                  />
                </div>
                <div className="content" style={isMobile ? { width: '85%' } : {}}>
                  <div className="filename">{attachment.name}</div>
                  <div className="size">{humanFileSize(attachment?.size)}</div>
                </div>
                <IconButton
                  onClick={() => onRemoveAttachment(attachment)}
                  iconProps={{ iconName: 'Clear' }}
                  title="Remove Attachment"
                  ariaLabel="Remove Attachment"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
