import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from '../page';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../style/global';
import { theme } from '../style/theme';

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Page />
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
