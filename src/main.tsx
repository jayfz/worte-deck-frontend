import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './preflight.css';
import { GlobalStyle } from '@/styles.globals.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <GlobalStyle />
    </React.StrictMode>,
);
