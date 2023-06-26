import App from 'app/App';
import { AnimateProvider } from 'app/providers/AnimateProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <AnimateProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AnimateProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
