import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { CIRCUIT_TAG } from './tags';

export const baseApi = createApi({
  reducerPath: 'api',
  endpoints: () => ({}),
  tagTypes: [CIRCUIT_TAG],
  baseQuery: baseQueryWithReauth,
});
