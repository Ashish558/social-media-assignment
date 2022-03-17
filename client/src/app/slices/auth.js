

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateIsAuthenticated: (state, { payload }) => {
            state.isAuthenticated = payload
        },

    }
})

export const {  updateIsAuthenticated } = authSlice.actions
export default authSlice.reducer
