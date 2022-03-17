

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboardPosts: [],
    isModalOpen: false,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updatePosts: (state, { payload }) => {
            state.dashboardPosts = payload
        },
        updateDeleteModal: (state, { payload }) => {
            state.isModalOpen = payload
        }
    }
})

export const { updatePosts, updateDeleteModal, } = dashboardSlice.actions
export default dashboardSlice.reducer
