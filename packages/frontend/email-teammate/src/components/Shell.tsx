import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@harmon.ie/collabria-frontend-storybook';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import appConfig from '../configuration/configuration';
import { appContextVar, AuthProvider, useReactiveVar } from '@harmon.ie/collabria-frontend-shared';

const Shell = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useReactiveVar(appContextVar);
  const [authProvider, setAuthProvider] = useState<AuthProvider>();
  useEffect(() => {
    setAuthProvider(new AuthProvider(appConfig));
  }, []);
  const handleLogout = () => {
    authProvider?.handleLogout();
    navigate('/login');
  };
  const handleRefresh = async () => {
    const requestUrl = `${appConfig.serverBaseUrl}/api/refresh`;
    const res: any = await fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }).catch(error => {
      console.log('error', error);
    });
  };
  return (
    <div style={{ height: '90%' }}>
      <Button onClick={handleLogout}>Disconnect</Button>
      <Outlet />
    </div>
  );
};

export default Shell;
