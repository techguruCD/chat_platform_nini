import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import isEmpty from "../../validation/isEmpty";
import { SERVER_URL } from '../../config'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.isAuthenticated = !isEmpty(action.payload)
            state.user = action.payload
        }
    },
})
export const { setCurrentUser } = authSlice.actions
export default authSlice.reducer