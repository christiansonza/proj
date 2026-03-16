import {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'

export const TodoApi = createApi({
    reducerPath:'TodoApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4000/todo', credentials:'include'}),
    tagTypes:['todo'],
    endpoints:(builder)=>({
        fetchData:builder.query({
            query:()=>({
                url:'/',
                method:'GET'
            }),
            providesTags:['todo']
        }),
        fetchDataById:builder.query({
            query:(id)=>({
                url:`${id}`,
                method:'GET'
            }),
            providesTags:['todo']
        }),
        createData:builder.mutation({
            query:(newData)=>({
                url:'/',
                method:'POST',
                body:newData
            }),
            invalidatesTags:['todo']
        }),
        updateData:builder.mutation({
            query:({id, ...update})=>({
                url:`${id}`,
                method:'PUT',
                body:update
            }),
            invalidatesTags:['todo']
        }),
        destroyData:builder.mutation({
            query:(id)=>({
                url:`${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['todo']
        }),
        markDone: builder.mutation({
            query: (id) => ({
                url: `/mark-done/${id}`, 
                method: 'PUT' 
            }),
        invalidatesTags: ['todo'],
        }),
     })
})

export const {
    useFetchDataQuery, 
    useFetchDataByIdQuery, 
    useCreateDataMutation, 
    useUpdateDataMutation, 
    useDestroyDataMutation, 
    useMarkDoneMutation
} = TodoApi