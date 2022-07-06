import React from 'react';
import './EmailPreview.scss';
import { ErrorState, Spinner, Text } from '@harmon.ie/collabria-frontend-storybook';
import { getFileTypeIconProps, gql, Icon, useQuery } from '@harmon.ie/collabria-frontend-shared';

const GET_EMAIL_DATA = gql`
  query ($itemId: String) {
    getEmailData(args: { itemId: $itemId }) {
      body
    }
  }
`;

const EmailPreview = ({ title, itemId, height, width }) => {
  const { data, loading, error } = useQuery(GET_EMAIL_DATA, { variables: { itemId } });
  const body = data?.getEmailData?.body;
  return (
    <div
      className="email-preview"
      style={{
        height,
        width,
      }}
    >
      <div className="title">
        <Icon
          {...getFileTypeIconProps({
            extension: 'eml',
            size: 32,
          })}
        />
        <Text level={'large'}>{title}</Text>
      </div>
      {loading && <Spinner label={'Loading...'} />}
      {error && (
        <ErrorState error={{ message: 'Failed to show preview, please try again later', name: 'error' }}></ErrorState>
      )}
      {body && <iframe title="Email Preview" frameBorder={0} style={{ flexGrow: 1 }} srcDoc={body}></iframe>}
    </div>
  );
};

export default EmailPreview;
