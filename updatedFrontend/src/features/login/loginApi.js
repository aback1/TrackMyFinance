import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = loginApi;
