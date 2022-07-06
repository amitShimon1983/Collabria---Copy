import React from 'react';
import { List, FocusZone, FocusZoneDirection } from '@fluentui/react';
import { Spinner } from '../../Spinner';
import { Text } from '../../Text';
import { SuggestionItemLoadingStyle } from '../styles';

export interface SuggestionsListProps {
  loading?: boolean;
  items: any[];
  children: (item: any, index?: number) => React.ReactNode;
}

const SuggestionsList = ({ loading, items, children }: SuggestionsListProps) => {
  return (
    <>
      {loading && (
        <FocusZone direction={FocusZoneDirection.vertical}>
          <div style={SuggestionItemLoadingStyle()}>
            <Spinner size={2} style={{ marginRight: 10 }} />
            <Text level="medium">Searching...</Text>
          </div>
        </FocusZone>
      )}
      {items.length > 0 && (
        <FocusZone direction={FocusZoneDirection.vertical}>
          <div>
            <List id="SearchList" tabIndex={0} items={items} onRenderCell={(item, index) => children(item, index)} />
          </div>
        </FocusZone>
      )}
    </>
  );
};

export default SuggestionsList;
