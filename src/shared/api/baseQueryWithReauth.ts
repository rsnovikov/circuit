import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/dist/query';
import { baseQuery } from './baseQuery';
import { invalidateTokenAction } from './invalidateTokenAction';

const AUTH_ERROR_CODE = 401;

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (typeof result.error?.status === 'number' && result.error.status === AUTH_ERROR_CODE) {
    api.dispatch(invalidateTokenAction());
  }

  return result;
};
