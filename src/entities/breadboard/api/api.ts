import { baseApi } from '@/shared/api';
import { BREADBOARD_TAG } from '@/shared/api/tags';
import {
  CircuitData,
  CircuitListItem,
  CreateBreadboardReq,
  CreateBreadboardRes,
  PartialCircuitData,
} from './types';

const baseUri = '/breadboard';

export const breadboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBreadboard: build.query<CircuitListItem[], void>({
      query: () => ({ url: baseUri, method: 'GET' }),
      providesTags: [BREADBOARD_TAG],
    }),
    createBreadboard: build.mutation<CreateBreadboardRes, CreateBreadboardReq>({
      query: (body) => ({ url: baseUri, method: 'POST', body }),
      invalidatesTags: [BREADBOARD_TAG],
    }),
    removeBreadboard: build.mutation<string, string>({
      query: (id) => ({ url: `${baseUri}/${id}`, method: 'DELETE' }),
      invalidatesTags: [BREADBOARD_TAG],
    }),
    partialUpdateBreadboard: build.mutation<CircuitData, PartialCircuitData>({
      query: (data) => ({ url: `${baseUri}/${data._id}`, method: 'PATCH', body: data }),
      invalidatesTags: [BREADBOARD_TAG],
    }),
  }),
});

export const {
  useGetAllBreadboardQuery,
  useCreateBreadboardMutation,
  useRemoveBreadboardMutation,
  usePartialUpdateBreadboardMutation,
} = breadboardApi;
