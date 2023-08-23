import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { NotificationContainer } from '@/features/notification';
import '@/shared/base.css';
import { BreadboardSvgProvider } from '@/shared/lib/BreadboardSvgProvider';
import { KeyDownProvider } from '@/shared/lib/KeyDownContext';
import { Spinner } from '@/shared/ui/Spinner';
import { appRouter } from './appRouter';
import { appStore, persistor } from './appStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <BreadboardSvgProvider>
          <KeyDownProvider>
            <RouterProvider router={appRouter()} />
            <NotificationContainer />
          </KeyDownProvider>
        </BreadboardSvgProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
