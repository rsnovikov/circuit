import { baseApi } from '@/shared/api';
import { CIRCUIT_TAG } from '@/shared/api/tags';
import {
  CircuitData,
  CircuitListItem,
  CreateCircuitReq,
  CreateCircuitRes,
  PartialCircuitData,
} from './types';

const baseUri = '/circuit';

export const circuitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCircuit: build.query<CircuitListItem[], void>({
      query: () => ({ url: baseUri, method: 'GET' }),
      providesTags: [CIRCUIT_TAG],
    }),
    getCircuitData: build.query<CircuitData, string>({
      query: (id) => ({ url: `${baseUri}/${id}` }),
    }),
    createCircuit: build.mutation<CreateCircuitRes, CreateCircuitReq>({
      query: (body) => ({ url: baseUri, method: 'POST', body }),
      invalidatesTags: [CIRCUIT_TAG],
    }),
    removeCircuit: build.mutation<string, string>({
      query: (id) => ({ url: `${baseUri}/${id}`, method: 'DELETE' }),
      invalidatesTags: [CIRCUIT_TAG],
    }),
    updateCircuit: build.mutation<CircuitData, PartialCircuitData>({
      query: (data) => ({ url: `${baseUri}/${data._id}`, method: 'PATCH', body: data }),
      invalidatesTags: [CIRCUIT_TAG],
    }),
  }),
});

export const {
  useGetAllCircuitQuery,
  useGetCircuitDataQuery,
  useCreateCircuitMutation,
  useRemoveCircuitMutation,
  useUpdateCircuitMutation,
} = circuitApi;
