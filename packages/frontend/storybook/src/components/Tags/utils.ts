import { ITag } from '@fluentui/react';

export const objectToMap = (items: ITag[]) => {
  const map: Record<any, ITag[]> = {};
  items.forEach((selectedItem: any) => {
    map[selectedItem.key] = selectedItem;
  });
  return map;
};

export const removeDuplicates = ({
  existingTags,
  suggestedTagList,
}: {
  existingTags: ITag[];
  suggestedTagList: ITag[];
}) => {
  if (existingTags?.length && suggestedTagList?.length) {
    const uniqueTags: ITag[] = [];
    const taskTagsMap = objectToMap(existingTags);
    suggestedTagList.forEach((tag: ITag) => {
      if (!taskTagsMap[tag.key]) {
        uniqueTags.push(tag);
      }
    });
    return uniqueTags;
  }
  return suggestedTagList;
};

export const getTextFromItem = (item: any) => item.name;
export const isValidInput = (input?: string) => input && input.trim().length < 33;
export const generateTag = (filtered: ITag[], filterText: string) => {
  if (
    !filtered?.length ||
    !filtered.find((tag: ITag) => tag.name.trim().toLowerCase() === filterText.trim().toLowerCase())
  ) {
    const newAdded: ITag = { key: filterText, name: `${filterText} (New tag)` };
    filtered.unshift(newAdded);
  }
};
