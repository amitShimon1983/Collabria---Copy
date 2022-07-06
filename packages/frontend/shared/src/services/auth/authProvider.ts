import { appContextVar } from '../apollo';

export class AuthProvider {
  appConfig: { [key: string]: any };
  constructor(appConfig: { [key: string]: any }) {
    this.appConfig = appConfig;
  }
  handleLogout() {
    const requestUrl = `${this.appConfig.serverBaseUrl}/api/logout`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }).catch(error => {
      console.log('error', error);
    });
    localStorage.removeItem('user');
    appContextVar({});
  }
}

export default AuthProvider;
