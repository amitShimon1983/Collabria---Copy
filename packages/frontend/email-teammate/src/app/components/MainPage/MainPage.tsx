import React, { useState, useCallback } from 'react';
import { CellMeasurerCache } from 'react-virtualized';
import classes from './MainPage.module.scss';
import { autoCompleteUtils, Spinner, Text, Toggle } from '@harmon.ie/collabria-frontend-storybook';
import SidePane from '../SidePane';
import MailSearch from '../MailSearch/MailSearch';
import MailList from '../MailList';
import {
  PanelType,
  theme,
  useCustomizations,
  useQuery,
  useSsrLocalStorage,
} from '@harmon.ie/collabria-frontend-shared';
import { filterFocused } from '@harmon.ie/collabria-frontend-shared/src/utils';
import { fakeData } from './fakeData';

const cache = new CellMeasurerCache({
  fixedWidth: false,
  fixedHeight: true,
  defaultHeight: 100,
});

const searchScopes = [
  {
    key: 0,
    text: 'Current Folder',
    hint: 'Search current folder',
  },
  {
    key: 1,
    text: 'All Mailbox',
    hint: 'Search mailbox',
  },
];

const MainPage = ({ onSelectMail, selectedMail }) => {
  const { customizations, sementicColors } = useCustomizations();
  const [onlyRead, setOnlyRead] = useSsrLocalStorage('onlyRead', false);
  const [searchOptions, onSearch] = useState({ searchString: '', scope: 0 });
  const [selectedFolder, setSelectedFolder] = useState({
    displayName: 'Inbox',
    path: 'Inbox',
    id: 'inbox',
  });

  const toggleRead = useCallback(
    value => {
      setOnlyRead(value);
    },
    [setOnlyRead]
  );

  const terms = searchOptions.searchString
    ? autoCompleteUtils.stringToTerms(searchOptions.searchString)
    : { freeText: '' };
  const onSearchOptionsUpdate = useCallback(({ searchString, scope, terms }) => {
    const payload = {
      searchString: terms?.freeText ? terms.freeText : searchString,
      scope,
    };
    onSearch(payload);
  }, []);

  const { searchString, scope } = searchOptions;
  const showOnlyFocused = scope === 0 && selectedFolder && selectedFolder.id === 'inbox';
  const onSelectFolder = useCallback(
    folder => {
      setSelectedFolder(folder);
    },
    [setSelectedFolder]
  );
  const {
    loading,
    error,
    data: emails,
    fetchMore,
  } = {
    fetchMore: () => {},
    data: fakeData.data,
    error: undefined,
    loading: false,
  };

  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;
    const prevMails = prev.getMails;
    const nextMails = fetchMoreResult.getMails;
    return {
      getMails: {
        results: [...prevMails.results, ...filterFocused(nextMails.results)],
        pageInfo: nextMails.pageInfo,
        __typename: prevMails.__typename,
      },
    };
  };
  console.log({ emails });

  return (
    <>
      <div className={`${classes['MainPage']} ${selectedMail && classes['inactive']}`}>
        <div className={classes.top}>
          <SidePane
            className={''}
            collapseButtonColor={'red'}
            type={PanelType.smallFixedFar}
            onSelectFolder={onSelectFolder}
            selectedFolder={selectedFolder}
            externalStyle={{}}
          />
          <div className={classes['list']}>
            <Text>{searchString ? 'Search Results' : selectedFolder.path}</Text>
            <MailSearch
              styles={{ root: { borderBottom: '3px solid #6264a7' } }}
              onSearch={onSearchOptionsUpdate}
              searchScopes={searchScopes}
              selectedFolder={selectedFolder}
              className=""
            />
            {
              <MailList
                cache={cache}
                showOnlyFocused={showOnlyFocused}
                searchTerm={terms?.freeText}
                searchTerms={terms}
                onSelectMail={onSelectMail}
                theme={customizations?.settings?.theme}
                semanticColors={sementicColors}
                loading={loading}
                error={error as any}
                data={emails?.getMails}
                fetchMore={fetchMore}
                updateQuery={updateQuery}
                additionalMailClassName={'overrideMailCss'}
              />
            }
          </div>
        </div>

        <div className={classes['footer']}>
          <Toggle
            checked={onlyRead()}
            label="Show only read emails"
            inlineLabel
            onChange={() => toggleRead(!onlyRead())}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
