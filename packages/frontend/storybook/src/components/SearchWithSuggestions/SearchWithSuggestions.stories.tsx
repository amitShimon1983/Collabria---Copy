import React, { useCallback, useState } from 'react';
import { IPersonaProps, Stack } from '@fluentui/react';
import { Story } from '@storybook/react';
import { times } from 'lodash';
import SearchWithSuggestions from './SearchWithSuggestions';
import { AsyncSearch, Item } from './types';

const peopleSuggestions = times(5).map(index => ({
  address: `name-${index}@harmon.ie`,
  name: `name-${index}`,
}));

export const Template: Story<IPersonaProps> = (args: any) => {
  const [asyncSearch, setAsyncSearch] = useState<AsyncSearch>({
    loading: false,
    error: undefined,
    data: [],
  });

  const onPeopleSearch = useCallback((value: string) => {
    setAsyncSearch({
      ...asyncSearch,
      loading: true,
    });
    const peoples = peopleSuggestions.filter(({ address }: Item) => address.toLowerCase().includes(value));
    setTimeout(() => {
      setAsyncSearch({
        ...asyncSearch,
        data: peoples,
        loading: false,
      });
    }, 700);
  }, []);

  return (
    <Stack>
      <SearchWithSuggestions
        onSearch={searchTerm => console.log('onSearch', { searchTerm })}
        onPeopleSearch={onPeopleSearch}
        asyncSearch={asyncSearch}
        {...args}
      />
    </Stack>
  );
};

export default {
  title: 'Components/SearchWithSuggestions',
  component: SearchWithSuggestions,
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
