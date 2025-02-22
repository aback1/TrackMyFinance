import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/userinformation/' }),
    endpoints: (builder) => ({

        getUserData: builder.query({
            query: (username) => ({
                url: `get?name=${username}`,
                method: 'GET'
            }),
            refetchOnMountOrArgChange: true,
            providesTags: ['userdata']
        }),

        updateUserData: builder.mutation({
            query: (userdata) => ({
                url: 'post',
                method: 'POST',
                body: userdata,
            }),
            invalidatesTags: ['userdata']
        }),

    })
})

export const {useGetUserDataQuery, useUpdateUserDataMutation} = userApi;