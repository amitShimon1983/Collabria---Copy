import { FunctionComponent, useEffect, useState } from 'react';
import { Customizer, StyledThemeProvider, StoreProvider, AppThemeProvider } from '../../../components';
import { DeviceContextProvider, theme } from '../../../services';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
interface AppProviderProps {
  serverUrl: string;
  themeName?: string;
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({ children, serverUrl, themeName }) => {
  const [customizations, setCustomizations] = useState<any>();

  useEffect(() => {
    const ctx = theme.getCustomizations(themeName);
    if (ctx) {
      setCustomizations(ctx);
    }
  }, []);

  return (
    <StoreProvider serverUrl={serverUrl}>
      <Customizer themeName={themeName} customizations={customizations}>
        <StyledThemeProvider customizations={customizations}>
          <AppThemeProvider customizations={customizations}>
            <DeviceContextProvider value={{ isMobile, isTablet, isAndroid, isIOS }}>{children}</DeviceContextProvider>
          </AppThemeProvider>
        </StyledThemeProvider>
      </Customizer>
    </StoreProvider>
  );
};

export default AppProvider;
