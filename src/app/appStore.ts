import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from '@/entities/auth';
import { baseApi } from '@/shared/api';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [authSlice.name],
};

const createStore = () => {
  return configureStore({
    reducer: persistReducer(persistConfig, rootReducer) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

export const appStore = createStore();

export const persistor = persistStore(appStore);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
