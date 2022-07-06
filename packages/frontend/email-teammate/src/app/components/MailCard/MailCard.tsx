import { useCustomizations } from '@harmon.ie/collabria-frontend-shared';
import React, { useRef } from 'react';
import EmailPreview from './EmailPreview';

const MailCard = ({ selectedMail, onRemoveAttachment, removedAttachmentsIds, inlineAttachments }) => {
  const parentRef = useRef(null);
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;
  if (!selectedMail) {
    return <></>;
  }

  const attachmentsToDisplay = ((selectedMail && selectedMail.attachments) || []).filter(
    attachment => !attachment.isInline && !removedAttachmentsIds.includes(attachment.attachmentId)
  );
  return (
    <>
      <div className="mail-card" ref={parentRef}>
        <EmailPreview
          palette={palette}
          attachmentsToDisplay={attachmentsToDisplay}
          selectedMail={selectedMail}
          onRemoveAttachment={onRemoveAttachment}
          inlineAttachments={inlineAttachments}
        />
      </div>
    </>
  );
};

export default MailCard;
