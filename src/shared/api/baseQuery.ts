import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { RootState } from '@/app/appStore';

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  },
});
