import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333'
    },
    secondary: {
      main: '#82B4EE'
    },
    background: {
      default: '#1B1B1B'
    }
  }
});

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
