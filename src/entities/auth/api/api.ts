import { baseApi } from '@/shared/api';
import { ILoginRequestBody, ILoginRequestResponse } from './types';

const baseUri = '/auth';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginRequestResponse, ILoginRequestBody>({
      query: (body) => ({ url: `${baseUri}/login`, method: 'POST', body }),
    }),
    register: build.mutation<ILoginRequestResponse, ILoginRequestBody>({
      query: (body) => ({ url: `${baseUri}/registration`, method: 'POST', body }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
