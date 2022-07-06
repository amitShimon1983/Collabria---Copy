import { FunctionComponent } from 'react';
import { CustomizationsContextProvider, theme } from '../../../services';

interface AppThemeProviderProps {
  customizations: any;
}

const AppThemeProvider: FunctionComponent<AppThemeProviderProps> = ({ customizations, children }) => {
  const sementicColors = theme.getSemanticColors();
  return (
    <CustomizationsContextProvider value={{ customizations, sementicColors }}>{children}</CustomizationsContextProvider>
  );
};

export default AppThemeProvider;
