import { baseApi } from '@/shared/api';
import { IAuthRequestBody, IAuthRequestResponse } from './types';

const baseUri = '/auth';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IAuthRequestResponse, IAuthRequestBody>({
      query: (body) => ({ url: `${baseUri}/login`, method: 'POST', body }),
    }),
    register: build.mutation<IAuthRequestResponse, IAuthRequestBody>({
      query: (body) => ({ url: `${baseUri}/registration`, method: 'POST', body }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
