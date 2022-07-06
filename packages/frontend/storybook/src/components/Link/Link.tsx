import React from 'react';
import { Link as FabricLink, ILinkProps } from '@fluentui/react';

const Link = ({ underline, target, disabled, href, children }: ILinkProps) => {
  return (
    <div>
      <FabricLink href={href} underline={underline} disabled={disabled} target={target}>
        {children}
      </FabricLink>
    </div>
  );
};

export default Link;
