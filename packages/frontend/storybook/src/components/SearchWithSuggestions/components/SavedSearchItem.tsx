import React, { useCallback } from 'react';
import { KeyCodes, FontIcon } from '@fluentui/react';
import { classNames } from '../styles';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { stringToTerms, decodeString } from './utils';

const TextItemWrapper = ({ children }: any) => (
  <Box padding="0,0,0,xxs" align="center">
    {children}
  </Box>
);

const SearchItem = ({ children }: any) => (
  <Box align="center">
    <Box style={{ minWidth: 32 }}>
      <FontIcon className={classNames().icon} iconName="History" />
    </Box>
    {children}
  </Box>
);

export interface SavedSearchItemProps {
  item: string;
  onClick: (savedSearch: string) => void;
}

const SavedSearchItem = ({ item, onClick }: SavedSearchItemProps) => {
  const savedSearch = decodeString(item);

  const onItemClick = () => {
    onClick(savedSearch);
  };

  const onKeyDown = useCallback(
    (ev: any) => {
      if (ev.which === KeyCodes.enter) {
        onItemClick();
      }
    },
    [onClick, item]
  );

  const renderItems = () => {
    const terms = stringToTerms(savedSearch);
    if (Object.prototype.hasOwnProperty.call(terms, 'freeText')) {
      return (
        <SearchItem>
          <TextItemWrapper>
            <Text style={{ fontSize: 13 }}>{terms.freeText}</Text>
          </TextItemWrapper>
        </SearchItem>
      );
    }

    const items: JSX.Element[] = [];
    for (const p in terms) {
      if (Object.prototype.hasOwnProperty.call(terms, p)) {
        items.push(
          <span key={p}>
            <Text style={{ fontSize: 13, opacity: '0.5' }}>{p}:&nbsp;</Text>
            <Text style={{ fontSize: 13 }}>{terms[p]}&nbsp;</Text>
          </span>
        );
      }
    }

    return <SearchItem>{items}</SearchItem>;
  };

  return (
    <div onClick={onItemClick} onKeyDown={onKeyDown} className={classNames().itemCell} data-is-focusable={true}>
      <Box padding="xxs">{renderItems()}</Box>
    </div>
  );
};

export default SavedSearchItem;
