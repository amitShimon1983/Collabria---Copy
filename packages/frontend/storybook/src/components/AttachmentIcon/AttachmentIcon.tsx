import { getFileTypeIconProps, Icon, utils } from '@harmon.ie/collabria-frontend-shared';

import { FunctionComponent } from 'react';

interface IconButtonProps {
  attachmentName: string;
  attachmentType: string;
  imageFileType: 'svg' | 'png';
  size: 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96;
  rest: any;
}

export const AttachmentIcon: FunctionComponent<IconButtonProps> = ({
  attachmentName,
  attachmentType,
  imageFileType,
  size = 32,
  rest,
}) => {
  return (
    <Icon
      {...getFileTypeIconProps({
        extension:
          attachmentType === '#microsoft.graph.itemAttachment' ? 'eml' : utils.getFileExtension(attachmentName),
        size,
        imageFileType,
      })}
      {...rest}
    />
  );
};
