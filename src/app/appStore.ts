import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api';
import { rootReducer } from './rootReducer';

const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export const appStore = createStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
