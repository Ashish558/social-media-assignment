

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updateposts: (state, { payload }) => {
            state.posts = payload
        },
        updateLikes: (state, { payload }) => {
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ?
                    { ...post, isLiked: payload.isLiked, likesCount: payload.likesCount } : post
                )
            }

        },

    }
})

export const { updateposts, updateLikes } = postsSlice.actions
export default postsSlice.reducer
