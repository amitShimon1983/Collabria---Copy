import React, { useCallback } from 'react';
import { PersonaSize, KeyCodes } from '@fluentui/react';
import { classNames, SuggestionItemStyle, SuggestionListStyle } from '../styles';
import { Persona } from '../../Persona';
import { Tooltip } from '../../Tooltip';
import { Item } from '../types';

export interface PeopleItemProps {
  item: Item;
  onClick: (item: Item) => void;
  search?: string;
  searchTerm: string;
}

const PeopleItem = ({ item, onClick, search, searchTerm }: PeopleItemProps) => {
  const { name, address } = item;

  const onItemClick = () => {
    onClick(item);
  };

  const onKeyDown = useCallback(
    (ev: any) => {
      if (ev.which === KeyCodes.enter) {
        onItemClick();
      }
    },
    [onClick, item]
  );

  return (
    <div
      style={SuggestionItemStyle()}
      key={item.address}
      onClick={onItemClick}
      onKeyDown={onKeyDown}
      className={classNames().itemCell}
      data-is-focusable={true}
    >
      <React.Fragment>
        <div id={`link${address}`} style={SuggestionListStyle()}>
          <Tooltip content={name || address}>
            <Persona
              text={name}
              secondaryText={`${searchTerm}: ${address}`}
              size={PersonaSize.size32}
              search={search}
              showSecondaryText={true}
              highlightStyle={{ fontWeight: 'bold' }}
            />
          </Tooltip>
        </div>
      </React.Fragment>
    </div>
  );
};

export default PeopleItem;
