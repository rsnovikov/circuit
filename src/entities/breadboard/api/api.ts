import { baseApi } from '@/shared/api';

const baseUri = '/breadboard';

export const breadboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBreadboard: build.query<[{ id: 'asd' }], void>({
      query: () => ({ url: baseUri, method: 'GET' }),
    }),
  }),
});

export const { useGetAllBreadboardQuery } = breadboardApi;
