import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import App from './App';
import { I18nProvider } from '@/i18n';
import '@forgedevstack/bear/styles.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider
      defaultMode="light"
      customVariants={{
        brand: { bg: '#6366f1', bgHover: '#4f46e5', text: '#ffffff' },
        anvil: { bg: '#4f46e5', bgHover: '#4338ca', text: '#ffffff', ring: '#6366f1' },
      }}
    >
      <BrowserRouter>
        <I18nProvider>
          <App />
        </I18nProvider>
      </BrowserRouter>
    </BearProvider>
  </React.StrictMode>,
);
