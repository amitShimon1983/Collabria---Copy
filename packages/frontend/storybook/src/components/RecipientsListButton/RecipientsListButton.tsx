import React, { BaseSyntheticEvent, CSSProperties } from 'react';
import { PersonaSize, ActionButton, Text } from '@fluentui/react';
import { ChevronDown16Regular } from '@fluentui/react-icons';

import styled from 'styled-components';
import { Persona } from '../Persona';
import { Box } from '../Box';

const StyledDropDownButton = styled(ActionButton)`
  width: 100%;
  border: solid 1px #c2c2c2;
  border-radius: 5px;
`;

export interface RecipientsListButtonProps {
  selectedItem?: any;
  selectedKey: string;
  disabled: boolean;
  onClick: (e: BaseSyntheticEvent) => void;
  style?: CSSProperties;
}
const RecipientsListButton = ({ onClick, disabled, selectedItem, selectedKey }: RecipientsListButtonProps) => {
  return (
    <StyledDropDownButton onClick={onClick} disabled={disabled}>
      <Box
        width={406}
        height={38}
        justify="space-between"
        align="center"
        padding="0,md"
        style={{ opacity: disabled ? '0.5' : '1' }}
      >
        {selectedKey ? (
          <Persona
            text={selectedItem?.name.toString() || ''}
            secondaryText={selectedItem?.address.toString() || ''}
            size={PersonaSize.size24}
            showSecondaryText
            styles={{
              details: { justifyContent: 'flex-start', flexDirection: 'row' },
              secondaryText: { paddingLeft: 6 },
            }}
          />
        ) : (
          <Text>Select recipient</Text>
        )}
        <ChevronDown16Regular />
      </Box>
    </StyledDropDownButton>
  );
};

export default RecipientsListButton;
