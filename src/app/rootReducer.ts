import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/entities/auth';
import { breadboardSlice } from '@/entities/breadboard';
import { nodeSlice } from '@/entities/node';
import { notificationSlice } from '@/entities/notification/model/slice';
import { wireSlice } from '@/entities/wire';
import { baseApi } from '@/shared/api';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [breadboardSlice.name]: breadboardSlice.reducer,
  [wireSlice.name]: wireSlice.reducer,
  [nodeSlice.name]: nodeSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});
