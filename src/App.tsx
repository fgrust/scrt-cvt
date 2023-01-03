import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from './muiTheme';
import Header from './components/header';
import ConvertForm from './components/convert-form';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ConvertForm />
    </ThemeProvider>
  );
}

export default App;
