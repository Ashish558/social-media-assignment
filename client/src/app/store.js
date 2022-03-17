import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authSlice from './slices/auth'
import postsSlice from './slices/posts'
import singlePostSlice from './slices/singlePost'
import dashboardReducer from './slices/dashboard'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postsSlice,
        singlePost: singlePostSlice,
        dashboard: dashboardReducer,
    },
    // middleware: applyMiddleware(authMiddleware),
    devTools: true
})

setupListeners(store.dispatch)
//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authSlice.middleware),

