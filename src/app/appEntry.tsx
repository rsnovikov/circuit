import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import '@/shared/base.css';
import { BreadboardSvgProvider } from '@/shared/lib/hooks/useBreadboardSvgRef';
import { KeyDownProvider } from '@/shared/lib/hooks/useKeyDown/KeyDownContext';
import { ModalProvider } from '@/shared/lib/hooks/useModal/useModal';
import { NotificationContainer } from '@/shared/notification';
import { Spinner } from '@/shared/ui/Spinner';
import { appRouter } from './appRouter';
import { appStore, persistor } from './appStore';

const main = () => {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root node is not on page');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ReduxProvider store={appStore}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <BreadboardSvgProvider>
            <KeyDownProvider>
              <ModalProvider>
                <RouterProvider router={appRouter()} />
              </ModalProvider>
              <NotificationContainer />
            </KeyDownProvider>
          </BreadboardSvgProvider>
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

main();
