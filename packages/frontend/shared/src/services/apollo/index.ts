import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject,
  from,
  RequestHandler,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const appContextVar = makeVar<{ [key: string]: any }>({});
export class ApolloClientProvider {
  client: ApolloClient<NormalizedCacheObject>;
  _uri: string;
  _link: ApolloLink;
  _serverUrl: string;
  constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
    this._initializeApolloClient();
  }

  _initializeApolloClient() {
    this._getUserFromLocalStorage();
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: this._createApolloLink(),
    });
  }
  _getUserFromLocalStorage() {
    const stringUser = localStorage.getItem('user');
    if (!!stringUser) {
      const newValue = {
        user: JSON.parse(stringUser),
        isAuthenticate: !!localStorage.getItem('user'),
      };
      appContextVar(newValue);
    }
  }
  _createApolloLink() {
    const httpLink = this._createHttpLink();
    const authMiddleware = this._createAuthMiddleware();
    const errorMiddleware = this._createErrorMiddleware();
    return from([errorMiddleware, authMiddleware, httpLink]);
  }

  _createHttpLink() {
    return new HttpLink({ uri: `${this._serverUrl}/api/graphql`, credentials: 'include' });
  }

  _createAuthMiddleware() {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
        },
      };
    });

    return authLink;
  }
  _createErrorMiddleware() {
    return onError(({ networkError, forward, operation }) => {
      forward(operation);
    });
  }
}
