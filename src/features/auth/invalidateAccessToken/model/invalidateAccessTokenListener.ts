import { TypedStartListening, createListenerMiddleware } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/appStore';
import { invalidateTokenEvent } from '@/shared/api/invalidateTokenEvent';
import { logoutThunk } from '../../logout/model/logoutThunk';

export const invalidateAccessTokenListener = createListenerMiddleware();

export type TypedListening = TypedStartListening<RootState, AppDispatch>;

export const startInvalidateAccessTokenListener =
  invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
  actionCreator: invalidateTokenEvent,
  effect: (_, api) => {
    api.dispatch(logoutThunk());
  },
});
