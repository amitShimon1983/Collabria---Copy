export class Configuration {
  azureAppClientId?: string;
  azureScopes?: string;
  azureAuthorizeUrl?: string;
  finishAuthRedirectEndpoint?: string;
  serverAuthEndpoint?: string;
  serverBaseUrl?: string;
  appBaseName?: string;
  chargebeeEnv?: string;
  chargebeePlan?: string;
  constructor() {
    this.azureAppClientId = this.getEnvProperty('VITE_AZURE_CLIENT_ID');
    this.azureScopes = this.getEnvProperty('VITE_AZURE_SCOPES');
    this.azureAuthorizeUrl = this.getEnvProperty('VITE_AZURE_AUTHORIZED_URL');
    this.finishAuthRedirectEndpoint = this.getEnvProperty('VITE_FINISH_AUTH_REDIRECT_URL');
    this.serverAuthEndpoint = this.getEnvProperty('VITE_SERVER_AUTH_ENDPOINT');
    this.serverBaseUrl = this.getEnvProperty('VITE_SERVER_BASE_URL');
    this.appBaseName = this.getEnvProperty('VITE_APP_BASE_NAME');
    this.chargebeeEnv = this.getEnvProperty('VITE_APP_CHARGE_BEE_ENV');
    this.chargebeePlan = this.getEnvProperty('VITE_APP_CHARGE_BEE_PLAN');
  }
  getEnvProperty(name: string): string | undefined {
    let property: string | undefined;
    if (import.meta.env?.VITE_SERVER_BASE_URL) {
      property = import.meta.env[name];
    } else {
      property = window[name];
    }
    return property;
  }
}
class AppConfig {
  private static config: Configuration;

  static init() {
    if (!this.config) {
      this.config = new Configuration();
    }
  }
  static getConfig(): Configuration {
    if (!this.config) {
      this.init();
    }
    return this.config;
  }
}
export default AppConfig.getConfig();
