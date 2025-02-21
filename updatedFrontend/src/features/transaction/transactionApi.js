import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/transactions',
    }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (username) => ({
                url: `get?username=${username}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                refetchOnMountOrArgChange: true,
                }),
            providesTags: ['transaction'],
            }),
        addTransaction: builder.mutation({
            query: (transaction) => ({
                url: 'add',
                method: 'POST',
                body: JSON.stringify(transaction),
            }),
            invalidatesTags: ['transaction'],
            transformResponse: (response) => ({
                ...response,
                ok: true,
            }),
        }),
        deleteTransaction: builder.mutation({
            query: (transaction) => ({
                url: 'delete',
                method: 'DELETE',
                body: JSON.stringify(transaction),
            }),
            invalidatesTags: ['transaction'],
        })
    })
});

export const {
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation,
} = transactionApi;