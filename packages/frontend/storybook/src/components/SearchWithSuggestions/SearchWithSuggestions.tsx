import React, { useState, useCallback } from 'react';
import { SearchBox, KeyCodes, ISearchBox } from '@fluentui/react';
import { SearchWithSuggestionsStyles, SearchBoxStyle } from './styles';
import { PeopleItem, SavedSearchItem, SuggestionsContainer, SuggestionsList, utils } from './components';
import { SearchInfo, Terms, AsyncSearch } from './types';
import useLocalStorage from '@harmon.ie/collabria-frontend-shared/src/hooks/useLocalStorage';

const { stringToTerms, termsToString, encodeString } = utils;
const containerRef = React.createRef<HTMLDivElement>();
const searchBoxComponentRef = React.createRef<ISearchBox>();

export interface SearchWithSuggestions {
  onSearch: (searchInfo: SearchInfo) => void;
  asyncSearch: AsyncSearch;
  onPeopleSearch: (value: string) => void;
  onClear: () => void;
  onChange: (searchInfo: SearchInfo) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchWithSuggestions = ({
  placeholder = 'Search',
  disabled,
  onSearch,
  onClear,
  onChange,
  onPeopleSearch,
  asyncSearch,
}: SearchWithSuggestions) => {
  const { data, loading } = asyncSearch;
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [terms, setTerms] = useState<Terms>({});
  const [valueToSearch, setValueToSearch] = useState({ value: '', term: '' });
  const [getSavedSearches, setSavedSearches] = useLocalStorage('saved-pool-searches', []);
  const savedSearches = getSavedSearches() || [];
  const handleClear = useCallback(() => {
    onClear && onClear();
    setSearchString('');
    setTerms({});
    setValueToSearch({ value: '', term: '' });
  }, [onClear]);

  const addSavedSearch = useCallback(
    (searchItem: any) => {
      if (!searchItem) {
        return;
      }
      const newItems = (savedSearches.length >= 8 ? savedSearches.slice(0, -1) : savedSearches) as any;
      const newItem = encodeString(searchItem);

      if (!newItems.includes(newItem)) {
        setSavedSearches([newItem, ...newItems]);
      }
    },
    [savedSearches, setSavedSearches]
  );

  const onSearchClick = useCallback(
    (searchString: any) => {
      setSearchString(searchString);
      const newTerms = stringToTerms(searchString);
      setTerms(newTerms);
      addSavedSearch(searchString);
      setValueToSearch({ value: '', term: '' });
      onSearch &&
        onSearch({
          searchString,
          terms: newTerms,
        });
    },
    [terms, searchString]
  );

  const onKeyDown = (ev: any) => {
    if (ev.which === KeyCodes.down) {
      const el = window.document.querySelector('#SearchList') as any;
      if (el) {
        el.focus();
      }
    }
  };

  const onSearchChange = useCallback(
    (event: any, searchString: any) => {
      const parsedTerms: Terms = stringToTerms(searchString);
      const from = parsedTerms.from !== undefined && parsedTerms.from !== terms.from ? parsedTerms.from : '';
      const to = parsedTerms.to !== undefined && parsedTerms.to !== terms.to ? parsedTerms.to : '';
      const value = from || to;
      const term = from ? 'from' : to ? 'to' : '';
      setValueToSearch({
        value,
        term,
      });
      setTerms(parsedTerms);
      setSearchString(searchString);
      onChange &&
        onChange({
          searchString,
          terms: parsedTerms,
        });
      if (valueToSearch.value) {
        onPeopleSearch && onPeopleSearch(valueToSearch.value);
      }
    },
    [terms]
  );

  const selectEnd = useCallback(() => {
    searchBoxComponentRef.current?.focus();
  }, [searchBoxComponentRef]);

  const onSuggestionsListClick = useCallback(
    (item: any) => {
      const newTerms = {
        ...terms,
        [valueToSearch.term]: item.address,
      };
      onSearchClick(termsToString(newTerms));
      setValueToSearch({ value: '', term: '' });
      selectEnd();
    },
    [terms]
  );
  const onSavedSearchListClick = useCallback((savedSearch: any) => {
    selectEnd();
    onSearchClick(savedSearch);
  }, []);

  const onSearchBoxFocus = useCallback(() => {
    setShowSavedSearches(true);
  }, []);
  const onSearchBoxBlur = useCallback(() => {
    setShowSavedSearches(false);
  }, []);

  const autoCompleteWidth = containerRef ? containerRef?.current?.offsetWidth : 523;
  return (
    <div ref={containerRef} onKeyDown={onKeyDown} style={SearchWithSuggestionsStyles()}>
      <SearchBox
        componentRef={searchBoxComponentRef}
        styles={SearchBoxStyle}
        autoComplete="off"
        role="search"
        placeholder={placeholder}
        disabled={disabled}
        onSearch={onSearchClick}
        onClear={handleClear}
        onChange={onSearchChange}
        onFocus={onSearchBoxFocus}
        value={searchString}
      />
      <SuggestionsContainer
        onDismiss={() => onSearchBoxBlur()}
        hidden={!valueToSearch?.value?.trim()}
        width={autoCompleteWidth}
        ref={containerRef}
      >
        <SuggestionsList loading={loading} items={(!loading && data) || []}>
          {(item: any) => {
            return (
              <PeopleItem
                item={item}
                onClick={onSuggestionsListClick}
                searchTerm={valueToSearch.term}
                search={valueToSearch.value}
              />
            );
          }}
        </SuggestionsList>
      </SuggestionsContainer>
      <SuggestionsContainer
        hidden={!showSavedSearches || !searchString}
        width={autoCompleteWidth}
        ref={containerRef}
        onDismiss={() => onSearchBoxBlur()}
      >
        <SuggestionsList items={savedSearches || []}>
          {(item: any, index?: number) => {
            return <SavedSearchItem key={`SavedSearchItem-${index}`} item={item} onClick={onSavedSearchListClick} />;
          }}
        </SuggestionsList>
      </SuggestionsContainer>
    </div>
  );
};

export default SearchWithSuggestions;
