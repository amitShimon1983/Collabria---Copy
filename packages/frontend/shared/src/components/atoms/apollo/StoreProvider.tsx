import React, { FunctionComponent, useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ApolloClientProvider } from '../../../services';

interface StoreProviderProps {
  serverUrl: string;
}

const StoreProvider: FunctionComponent<StoreProviderProps> = ({ children, serverUrl }) => {
  const [client, setClient] = useState<ApolloClient<any>>();
  useEffect(() => {
    const apolloProvider = new ApolloClientProvider(serverUrl);
    setClient(apolloProvider.client);
  }, []);

  return (client && <ApolloProvider client={client}>{children}</ApolloProvider>) || <></>;
};

export default StoreProvider;
