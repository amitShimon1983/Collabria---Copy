import { Text } from '@harmon.ie/collabria-frontend-storybook';
import React, { FunctionComponent } from 'react';
import classes from './ErrorPage.scss';
interface ErrorPageProps {
  message: string;
}

const ErrorPage: FunctionComponent<ErrorPageProps> = ({ message }) => {
  return (
    <div className={classes['empty-container']}>
      <img className="image" src="https://static-teammate.azureedge.net/static/cant-share-mail.svg" alt={'failed'} />
      <Text>{message}</Text>
    </div>
  );
};
export default ErrorPage;
