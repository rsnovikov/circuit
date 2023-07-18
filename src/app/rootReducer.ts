import { combineReducers } from '@reduxjs/toolkit';
import { breadboardSlice } from '@/entities/breadboard';
import { baseApi } from '@/shared/api';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [breadboardSlice.name]: breadboardSlice.reducer,
});
