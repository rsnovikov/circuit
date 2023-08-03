import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '@/shared/base.css';
import { KeyDownProvider } from '@/shared/lib/KeyDownProvider';
import { appRouter } from './appRouter';
import { appStore } from './appStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <KeyDownProvider>
        <RouterProvider router={appRouter()} />
      </KeyDownProvider>
    </ReduxProvider>
  </React.StrictMode>
);
