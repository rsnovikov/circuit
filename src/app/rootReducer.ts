import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/entities/auth';
import { CirElementSlice } from '@/entities/cirElement/model/slice';
import { circuitSlice } from '@/entities/circuit';
import { nodeSlice } from '@/entities/node';
import { wireSlice } from '@/entities/wire';
import { baseApi } from '@/shared/api';
import { notificationSlice } from '@/shared/notification/model/slice';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [circuitSlice.name]: circuitSlice.reducer,
  [CirElementSlice.name]: CirElementSlice.reducer,
  [wireSlice.name]: wireSlice.reducer,
  [nodeSlice.name]: nodeSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});
