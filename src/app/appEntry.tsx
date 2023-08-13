import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { NotificationContainer } from '@/features/notification';
import '@/shared/base.css';
import { BreadboardSvgProvider } from '@/shared/lib/BreadboardSvgProvider';
import { KeyDownProvider } from '@/shared/lib/KeyDownContext';
import { appRouter } from './appRouter';
import { appStore } from './appStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <BreadboardSvgProvider>
        <KeyDownProvider>
          <RouterProvider router={appRouter()} />
          <NotificationContainer />
        </KeyDownProvider>
      </BreadboardSvgProvider>
    </ReduxProvider>
  </React.StrictMode>
);
