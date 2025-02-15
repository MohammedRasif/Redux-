import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../api/postsApi';

export const store = configureStore({
    reducer: {
        // Add the API slice reducer to the store
        [postsApi.reducerPath]: postsApi.reducer,
    },
    // Add the middleware required for RTK Query
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(postsApi.middleware),
});
