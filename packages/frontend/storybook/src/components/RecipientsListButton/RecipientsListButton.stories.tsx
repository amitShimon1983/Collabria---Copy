import React, { useCallback, useMemo, useRef, useState } from 'react';
import { utils } from '@harmon.ie/collabria-frontend-shared';
import { IPersonaProps, SearchBox, Callout } from '@fluentui/react';
import { Story } from '@storybook/react';
import RecipientsListButton from './RecipientsListButton';
import OptionItem from '../RecipientsList/OptionsItem';
import styled from 'styled-components';
import { Box } from '../Box';

const StyledCallout = styled(Callout)`
  .ms-Callout-main {
    background-color: #ffffff;
  }
`;

const SearchBoxWrapper = styled(SearchBox)`
  width: 100%;
  border: solid 1px #c2c2c2;
  border-radius: 5px;

  &:hover {
    border: solid 1px #6061aa;
  }

  .ms-SearchBox-iconContainer {
    color: #ffffff;
  }
`;

const options = utils.times(20).map(index => ({
  name: `Name-${index}`,
  address: `address-${index}@harmon.ie`,
}));

export const Template: Story<IPersonaProps> = (args: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>('');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const calloutTargetRef = useRef(null);

  const toggleCallout = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const closeCallout = useCallback(() => {
    setOpen(false);
  }, [open]);

  const onClick = useCallback((value: string) => {
    setSelectedKey(value);
    setOpen(false);
  }, []);

  const openCallout = useCallback(() => {
    setOpen(true);
  }, []);

  const items = useMemo(
    () =>
      options.filter(
        ({ name, address }: any) =>
          name?.toLowerCase().includes(search?.toLowerCase()) || address?.toLowerCase().includes(search?.toLowerCase())
      ),
    [options, search]
  );

  const selectedItem = useMemo(
    () => options.find(({ address }: any) => address === selectedKey),
    [options, selectedKey]
  );

  const { disabled } = args;
  return (
    <Box asColumn padding="0,0,0,md" width="100%">
      <Box width="100%" padding="md,0,md,xxl">
        <Box width={414} ref={calloutTargetRef} style={{ padding: '0 0 0 6px' }}>
          <RecipientsListButton
            onClick={toggleCallout}
            disabled={disabled}
            selectedItem={selectedItem}
            selectedKey={selectedKey}
          />
        </Box>
      </Box>
      {open && (
        <StyledCallout
          target={calloutTargetRef.current}
          onDismiss={closeCallout}
          hidden={!open}
          isBeakVisible={false}
          calloutWidth={406}
          calloutMaxHeight={198}
          styles={{ root: { marginTop: 4 } }}
        >
          <Box padding="xxs,md" width="100%" height="40px">
            <SearchBoxWrapper
              value={search}
              onChange={(event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => setSearch(newValue)}
              onFocus={openCallout}
              placeholder="Search"
              autoComplete={'off'}
            />
          </Box>
          <Box asColumn style={{ maxHeight: 150, overflow: 'auto' }}>
            {items.length ? (
              items.map((recipient: any) => (
                <OptionItem
                  key={recipient.address}
                  recipient={recipient}
                  selected={recipient.address === selectedKey}
                  onClick={onClick}
                  search={search}
                />
              ))
            ) : (
              <Box padding="md">No results were found</Box>
            )}
          </Box>
        </StyledCallout>
      )}
    </Box>
  );
};

export default {
  title: 'Components/RecipientsListButton',
  component: RecipientsListButton,
  parameters: {
    layout: 'padded',
    controls: { include: ['disabled'] },
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};
