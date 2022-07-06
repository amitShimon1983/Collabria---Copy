import React from 'react';
import MailBodyPreview from './MailBodyPreview';
import useSanitizeEmailBody from '~/app/hookes/useSanitizeEmailBody';

const MailBody = ({ body, inlineAttachments }) => {
  const { sanitizeBody } = useSanitizeEmailBody({
    body,
    emailAttachments: inlineAttachments?.getEmailAttachments,
  });

  return (
    <>
      <div style={{ overflow: 'auto', display: 'block', paddingRight: 16 }}>
        <MailBodyPreview body={sanitizeBody} />
      </div>
    </>
  );
};

export default MailBody;
