import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  
  * {
    box-sizing: border-box;
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #ffffff;
  }

  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #E0E0E1;
  }
`;

export default () => <GlobalStyle />;
