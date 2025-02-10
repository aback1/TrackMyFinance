import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/spendings/' }),
  endpoints: (builder) => ({
    getSavings: builder.query({
      query: (username) => ({
        url: 'get',
        method: 'GET',
        params: { username },
        refetchOnMountOrArgChange: true,
      }),
      providesTags: ['savings'],
    }),
    postSavings: builder.mutation({
      query: (savings) => ({
        url: 'post',
        method: 'POST',
        body: JSON.stringify(savings),
      }),
      invalidatesTags: ['savings'],
      transformResponse: (response) => ({
        ...response,
        ok: true,
      }),
    }),
    deleteSavings: builder.mutation({
      query: (spending) => ({
        url: 'delete',
        method: 'DELETE',
        body: JSON.stringify(spending),
      }),
      invalidatesTags: ['savings'],
    }),
  }),
});

export const {
  useGetSavingsQuery,
  usePostSavingsMutation,
  useDeleteSavingsMutation,
} = historyApi;
