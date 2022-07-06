import React, { useCallback, useState } from 'react';
import { Stack, ITag } from '@fluentui/react';
import { Story } from '@storybook/react';
import { uniqueId } from 'lodash';
import { getTheme } from '@fluentui/react';
import styled from 'styled-components';
import Tags from './Tags';
import { theme } from '@harmon.ie/collabria-frontend-shared';
import { removeDuplicates, generateTag, isValidInput } from './utils';

const StyledCustomTagPicker = styled(Tags)`
  .ms-BasePicker-itemsWrapper {
    flex-wrap: wrap;
    max-width: 350px;
  }
  .ms-TagItem {
    color: ${({ itemTextColor }) => itemTextColor};
    background: ${({ itemTextBackground }) => itemTextBackground};
    border-radius: 5px;
    max-width: 85px;
    height: 24px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1300px) {
      max-width: 75px;
      height: 20px;
      font-size: 11px;
    }
  }

  .ms-TagItem-close {
    font-size: 12px;
    width: 25px;
  }
`;

const suggestions = [
  {
    name: 'test',
    key: '62a881486eec9705d4866b22',
  },
  {
    name: 'test1',
    key: '62a881486eec9705d4866b55',
  },
  {
    name: 'test2',
    key: '62a881486eec9705d4866b25',
  },
];
export const Template: Story = args => {
  const { itemLimit } = args;
  const [tagsStartWith, setTagsStartWith] = useState<string>('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [filterSuggestions, setFilterSuggestion] = useState<any[]>(suggestions);
  const placeholder = tags?.length ? '' : 'Click to add tag...';
  const semanticColors = theme.getSemanticColors();
  const { palette } = getTheme();

  const filterSuggestedTags = useCallback(
    async (filterText: string, newTags: ITag[] | undefined): Promise<ITag[]> => {
      const filtered: ITag[] = [];
      setTagsStartWith(filterText);
      // if (filterText?.trim() && fetchFilteredTags) {
      //   filtered = await fetchFilteredTags({ tagsStartWith: filterText });
      // }
      if (isValidInput(filterText)) {
        generateTag(filtered, filterText);
      }
      return removeDuplicates({
        suggestedTagList: filtered,
        existingTags: [...tags, ...(newTags || [])],
      });
    },
    [tags]
  );

  const onSelectedTag = async ({ name, id }: { name: string; id?: string }) => {
    if (!tags?.length || tags?.length < 5) {
      if (
        !tags.find((tag: any) => tag?.name?.trim()?.toLowerCase() === name?.trim()?.toLowerCase() || tag?._id === id)
      ) {
        setTagsStartWith('');
        setTags([...tags, { key: uniqueId(), name: name }]);
        const filterTagsSuggestions = filterSuggestions.filter(suggestion => id !== suggestion.key);
        setFilterSuggestion(filterTagsSuggestions);
      }
    }
  };
  const dismissTag = useCallback(
    async (tagId: string) => {
      const filterTags = tags.filter((tag: ITag) => tag?.key !== tagId);
      setTags(filterTags);
    },
    [tags]
  );

  return (
    <Stack tokens={{ childrenGap: 4 }}>
      <StyledCustomTagPicker
        // fetchFilteredTags={fetchMoreTags}
        setSearchFilter={setTagsStartWith}
        suggestedTagList={filterSuggestions}
        onSelectedTag={onSelectedTag}
        inputTextColor={palette.black}
        buttonColor={'white'}
        itemTextColor={'#ffffff'}
        buttonHoverColor={semanticColors.primaryButtonBackgroundHovered}
        itemTextBackground={semanticColors.primaryButtonBackground}
        underlineColor={palette.black}
        existingTags={tags}
        onTagDismiss={dismissTag}
        itemLimit={itemLimit}
        placeholder={placeholder}
        onResolveSuggestions={filterSuggestedTags}
      />
    </Stack>
  );
};

export default {
  title: 'Components/Tags',
  component: Tags,
  parameters: {
    layout: 'padded',
    controls: { include: ['itemLimit'] },
  },
  argTypes: {
    itemLimit: {
      defaultValue: 3,
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
};
