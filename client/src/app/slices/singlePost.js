

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {},
}

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updateSinglePost: (state, { payload }) => {
            state.post = payload
        },
        updateLikes: (state, { payload }) => {
            state.post ={
                ...state.post,
                isLiked: payload.isLiked,
                likesCount: payload.likesCount
            }
        },

        updateComments: (state, { payload }) => {
            state.post.comments = payload
        },
        addComment: (state, { payload }) => {
            state.post.comments.push(payload)
        },

    }
})

export const {
    updateSinglePost, updateLikes,
    updateComments, addComment
} = posts.actions
export default posts.reducer
