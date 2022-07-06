import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Shell } from '../../components';
import {
  RequireAuth,
  GraphAuthentication,
  FinishAuth,
  Login,
  appContextVar,
  useReactiveVar,
  AppProvider,
} from '@harmon.ie/collabria-frontend-shared';
import appConfig from '../../configuration/configuration';
import Settings from './Settings';
import SharePage from './SharePage';

const App = () => {
  const { isAuthenticate } = useReactiveVar(appContextVar);
  const [graphAuthentication, setGraphAuthentication] = useState<GraphAuthentication>();
  useEffect(() => {
    if (!graphAuthentication) {
      setGraphAuthentication(new GraphAuthentication(appConfig));
    }
  }, []);

  return (
    <AppProvider serverUrl={appConfig.serverBaseUrl || ''}>
      <Routes>
        <Route path="*" element={<Navigate to={`${appConfig.appBaseName}/shared`} />} />
        <Route
          path={`/${appConfig.appBaseName}${appConfig.finishAuthRedirectEndpoint}`}
          element={
            <FinishAuth
              authenticateUser={graphAuthentication?.authenticateUser?.bind(graphAuthentication)}
              url={`${window.location.origin}${appConfig.appBaseName}${appConfig.finishAuthRedirectEndpoint}`}
            />
          }
        />
        <Route
          element={
            <RequireAuth baseUrl={appConfig.appBaseName || ''} isAuthenticated={isAuthenticate}>
              <Shell />
            </RequireAuth>
          }
        >
          <Route path={`/${appConfig.appBaseName}/settings`} element={<Settings />} />
          <Route path={`/${appConfig.appBaseName}/shared`} element={<SharePage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
