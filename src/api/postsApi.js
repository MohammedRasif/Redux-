import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API URL (for example, using JSONPlaceholder for testing)
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create the API slice
export const postsApi = createApi({
    reducerPath: 'postsApi', // Name for the slice reducer
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL, // Set the base URL for requests
    }),
    tagTypes: ['Post'], // Define tags for invalidating cache after mutations
    endpoints: (builder) => ({
        // Get all posts
        getPosts: builder.query({
            query: () => '/posts', // API endpoint for getting posts
            providesTags: ['Post'], // Specifies tags for cache invalidation
        }),

        // Get a single post by ID
        getPost: builder.query({
            query: (id) => `/posts/${id}`, // API endpoint for a single post
            providesTags: ['Post'],
        }),

        // Create a new post
        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost, // Data to send in the request body
            }),
            invalidatesTags: ['Post'], // Invalidating cache after mutation
        }),

        // Update an existing post
        updatePost: builder.mutation({
            query: ({ id, updatedPost }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: updatedPost, // Data to send in the request body
            }),
            invalidatesTags: ['Post'],
        }),

        // Delete a post
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

// Export hooks for the defined endpoints
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postsApi;
