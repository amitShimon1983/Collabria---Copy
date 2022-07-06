import { AuthProvider, Icon } from '@harmon.ie/collabria-frontend-shared';
import { Button } from '@harmon.ie/collabria-frontend-storybook';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../../configuration/configuration';
import classes from './Settings.module.scss';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [authProvider, setAuthProvider] = useState<AuthProvider>();
  useEffect(() => {
    setAuthProvider(new AuthProvider(appConfig));
  }, []);
  const handleLogout = () => {
    authProvider?.handleLogout();
  };
  return (
    <div className={classes['settings-page']}>
      <div className={classes['page-title']}>Settings</div>
      <Button onClick={handleLogout}>Logout</Button>
      <div className={classes['settings-back']}>
        <Link to="/">
          <Icon {...{ iconName: 'ChromeClose' }} />
        </Link>
      </div>
    </div>
  );
};

export default Settings;
