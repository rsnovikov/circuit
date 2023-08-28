import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/dist/query';
import { baseQuery } from './baseQuery';
import { invalidateTokenEvent } from './invalidateTokenEvent';

const AUTH_ERROR_CODE = 401;

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (typeof result.error?.status === 'number' && result.error.status === AUTH_ERROR_CODE) {
    api.dispatch(invalidateTokenEvent());
  }

  return result;
};
