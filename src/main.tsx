import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './preflight.css';
import { GlobalStyle } from '@/styles.globals.tsx';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '@/themes.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
);
