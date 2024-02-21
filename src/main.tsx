import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './preflight.css';
import { ApplicationProvider } from '@/context/ApplicationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </React.StrictMode>,
);
