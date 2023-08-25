import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BREADBOARD_TAG } from './tags';

export const baseApi = createApi({
  reducerPath: 'api',
  endpoints: () => ({}),
  tagTypes: [BREADBOARD_TAG],
  baseQuery: baseQueryWithReauth,
});
