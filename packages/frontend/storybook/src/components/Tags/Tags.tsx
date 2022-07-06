import React, { useMemo, useCallback } from 'react';
import { ITagPickerProps, TagPicker, IBasePickerSuggestionsProps, ITag, ValidationState } from '@fluentui/react';
import styled from 'styled-components';
import { removeDuplicates, objectToMap, getTextFromItem, isValidInput } from './utils';

const styles = {
  text: { border: 'none', fontSize: '8px' },
  root: { maxWidth: '100%' },
  itemsWrapper: { fontSize: '8px' },
  input: { width: '20%' },
};
const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No tag was found',
};

type Props = ITagPickerProps & {
  itemLimit: number;
  inputTextColor?: string;
  className?: string;
  buttonHoverColor?: string;
  itemTextColor?: string;
  buttonColor?: string;
  itemTextBackground?: string;
  underlineColor?: string;
  placeholder?: string;
  background?: string;
  existingTags?: ITag[];
  suggestedTagList?: ITag[];
  fetchFilteredTags?: ({ tagsStartWith }: { tagsStartWith: string }) => Promise<any>;
  setSearchFilter?: (tagsStartWith: string) => void;
  onSelectedTag?: ({ name, id }: { name: string; id?: string }) => void;
  onTagDismiss?: (tagId: string) => Promise<void>;
  onSuggestionTagDismiss?: (tags: ITag[]) => Promise<void>;
  onResolveSuggestions?: (filter: string, selectedItems?: ITag[]) => ITag[] | PromiseLike<ITag[]>;
};
const StyledTagPicker = styled(TagPicker)<{
  inputTextColor?: string;
  itemTextColor?: string;
  itemTextBackground?: string;
  buttonHoverColor?: string;
  underlineColor?: string;
  buttonColor?: string;
}>`
  width: 100%;
  .ms-BasePicker-itemsWrapper {
    flex-wrap: initial;
    max-width: max-content;
  }
  .ms-BasePicker-input {
    color: ${({ inputTextColor }) => inputTextColor};
    border: none;
    min-width: 20px;
    width: 20px;
  }
  & ::placeholder {
    color: ${({ inputTextColor }) => inputTextColor};
    opacity: 0.6;
  }
  .ms-Button-flexContainer i {
    color: ${({ buttonColor }) => buttonColor};
    font-size: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ms-Button-flexContainer i:hover {
    opacity: 0.6;
  }

  .ms-TagItem-close {
    border-radius: 5px;
  }
  @media (max-width: 1300px) {
    .ms-TagItem-close {
      width: 17px;
    }
  }
  .ms-TagItem-close:hover {
    background-color: ${({ buttonHoverColor }) => buttonHoverColor};
  }
  .ms-TagItem-text {
    margin: 0;
    text-align: center;
    max-width: 8ch;
    padding-left: 5px;
  }

  .ms-BasePicker-text {
    border-bottom: ${({ underlineColor }) => `1px solid ${underlineColor}`};
    flex-wrap: initial;
    min-width: auto;
    min-height: auto;
  }

  & .ms-BasePicker-text::after {
    border: none;
  }
`;
const Tags = ({
  className,
  itemLimit,
  inputTextColor = '#ffffff',
  itemTextColor = '#000000',
  buttonColor = '#000000',
  itemTextBackground = '#ffffff',
  underlineColor = '#ffffff',
  buttonHoverColor = '#ffffffe2',
  onSelectedTag,
  onTagDismiss,
  suggestedTagList: suggestedTagList = [],
  onSuggestionTagDismiss,
  existingTags = [],
  placeholder = '',
  onResolveSuggestions,
}: Props) => {
  pickerSuggestionsProps.suggestionsHeaderText = suggestedTagList?.length ? 'Suggested tags' : 'Insert tag name';
  const filteredBoardTagList = useMemo(() => suggestedTagList, [suggestedTagList]);

  const recentSelectedItems = useCallback(
    (selectedItems?: ITag[] | undefined) => {
      return removeDuplicates({
        suggestedTagList: filteredBoardTagList,
        existingTags: [...existingTags, ...(selectedItems || [])],
      });
    },
    [filteredBoardTagList, existingTags]
  );

  const onItemSelected = useCallback(
    (selectedItem?: ITag | undefined) => {
      if (selectedItem) {
        const existsTag = existingTags?.find(
          (tag: any) =>
            tag.key === selectedItem?.key ||
            tag?.name?.trim()?.toLowerCase() === selectedItem?.name?.trim()?.toLowerCase()
        );
        if (!existsTag) {
          const tagName = selectedItem?.name?.trim()?.replace(' (New tag)', '');
          if (isValidInput(tagName)) {
            const newTag = { name: tagName, key: `${selectedItem.key}` };
            onSelectedTag?.({
              ...newTag,
              id: `${selectedItem.key}`,
            });
            return newTag;
          }
        }
      }
      return null;
    },
    [existingTags, isValidInput, onSelectedTag]
  );
  const onCreateOrUpdate = useCallback(
    (value: any) => {
      const newTagName = value?.trim().replace(' (New tag)', '');
      if (newTagName?.trim() && newTagName?.trim().length < 33) {
        const existingTag = filteredBoardTagList?.find(
          (tag: ITag) => tag?.name?.trim()?.toLowerCase() === value?.trim()?.toLowerCase()
        );
        if (onSelectedTag) {
          if (existingTag) {
            onSelectedTag?.({
              name: existingTag.name.replace(' (New tag)', ''),
              id: `${existingTag.key}`,
            });
          } else {
            onSelectedTag?.({
              name: newTagName,
            });
          }
        }
      }
    },
    [filteredBoardTagList, onSelectedTag]
  );

  const onInputValidate = useCallback(
    (input: string) => {
      onCreateOrUpdate(input);
      const existingTags = suggestedTagList.find(
        (tag: ITag) => tag?.name?.trim()?.toLowerCase() === input?.trim()?.toLowerCase()
      );
      if (existingTags) {
        return ValidationState.valid;
      }
      return ValidationState.invalid;
    },
    [suggestedTagList, onCreateOrUpdate]
  );

  const onBlurHandler = (event: any) => {
    const { value } = event?.target;
    if (!onSuggestionTagDismiss) {
      onCreateOrUpdate(value);
    }
  };

  const onDismissItem = useCallback(
    async (items?: ITag[] | undefined) => {
      if (items && items?.length < existingTags.length) {
        const map: any = objectToMap(items);
        for (let index = 0; index < existingTags?.length; index++) {
          const tag = existingTags[index];
          if (!map[tag.key]) {
            await onTagDismiss?.(`${tag.key}`);
          }
        }
      }
      if (onSuggestionTagDismiss) {
        await onSuggestionTagDismiss?.(items || []);
      }
    },
    [existingTags, onTagDismiss, onSuggestionTagDismiss]
  );

  return (
    // <div className={classes.container}>
    <StyledTagPicker
      className={className}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
      selectedItems={existingTags || []}
      onValidateInput={onInputValidate}
      onBlur={onBlurHandler}
      onChange={onDismissItem}
      onItemSelected={onItemSelected}
      onEmptyResolveSuggestions={recentSelectedItems}
      inputTextColor={inputTextColor}
      itemTextColor={itemTextColor}
      itemTextBackground={itemTextBackground}
      underlineColor={underlineColor}
      inputProps={{ placeholder: placeholder, id: 'tag-picker', maxLength: 32 }}
      removeButtonAriaLabel="Remove"
      onResolveSuggestions={onResolveSuggestions}
      getTextFromItem={getTextFromItem}
      pickerSuggestionsProps={pickerSuggestionsProps}
      itemLimit={itemLimit}
      styles={styles}
      pickerCalloutProps={{
        doNotLayer: false,
      }}
      resolveDelay={500}
    />
    // </div>
  );
};
export default Tags;
