import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Customizer } from '@fluentui/react';
import { theme } from '../src';
import GlobalStyle from '../src/globalStyles';

export const decorators = [
  Story => {
    const customizations = theme.getCustomizations();
    return (
      <Customizer {...customizations}>
        <ThemeProvider theme={customizations ? customizations.settings.theme : {}}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </Customizer>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};
