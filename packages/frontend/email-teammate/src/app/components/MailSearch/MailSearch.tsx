import React, { useState, useCallback, useEffect } from 'react';
import './MailSearch.scss';
import { Dropdown, useCustomizations, useDeviceContext } from '@harmon.ie/collabria-frontend-shared';
import { SearchWithSuggestions } from '@harmon.ie/collabria-frontend-storybook';
import usePeopleSearch from '~/app/hookes/usePeopleSearch';

const getDropdownStyles = () => {
  const { customizations } = useCustomizations();
  const { palette } = customizations.settings.theme;

  return {
    dropdown: { width: 128 },
    root: {
      border: 'none',
    },
    title: {
      border: 'none',
      backgroundColor: palette.neutralLight,
    },
  };
};

function getMobileScope(selectedFolder) {
  return selectedFolder.id === 'inbox' || selectedFolder.wellKnownName === 'inbox' ? 1 : 0;
}

function MailSearch({ onSearch, searchScopes, selectedFolder, className, styles }) {
  const { isMobile } = useDeviceContext();

  // const [searchScopeKey, setSearchScopeKey] = useState(isMobile ? getMobileScope(selectedFolder) : 0);
  const [searchScopeKey, setSearchScopeKey] = useState(0);
  const [peopleSearch, setPeopleSearch] = useState<string>('');
  const { loading, data, error } = usePeopleSearch(peopleSearch);
  //default scope for mobile
  useEffect(() => {
    if (isMobile) {
      const mobileScope = getMobileScope(selectedFolder);
      if (mobileScope !== searchScopeKey) {
        setSearchScopeKey(mobileScope);
      }
    }
  }, [isMobile, selectedFolder, searchScopeKey]);

  const handleAutocompleteSearch = useCallback(
    values => {
      onSearch({
        ...values,
        scope: searchScopeKey,
      });
      // mixpanelEvent('Search Email', { values });
    },
    [onSearch, searchScopeKey, searchScopes]
  );
  const onPeopleSearch = (value: any) => {
    setPeopleSearch(value);
  };
  const onChange = (value: any) => {};
  const handleAutocompleteClear = useCallback(() => {
    onSearch({ searchString: '', scope: 0 });
  }, [onSearch, searchScopeKey]);
  return (
    <div style={styles?.root || {}} className={`search-box-holder ${className}`}>
      <Dropdown
        placeholder="Select an option"
        options={searchScopes}
        styles={getDropdownStyles()}
        defaultSelectedKey={searchScopeKey}
        onChange={(event: React.FormEvent<HTMLDivElement>, option?: any, index?: number) =>
          setSearchScopeKey(option.key)
        }
      />
      <SearchWithSuggestions
        placeholder="Search"
        // className={className}
        asyncSearch={{ loading, data, error }}
        onPeopleSearch={onPeopleSearch}
        onSearch={handleAutocompleteSearch}
        onClear={handleAutocompleteClear}
        onChange={onChange}
        // selectedFolder={selectedFolder}
      />
    </div>
  );
}

export default MailSearch;
