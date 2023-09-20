import { createSlice } from '@reduxjs/toolkit'
import isEmpty from '../../validation/isEmpty'
export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        errors: {}
    },
    reducers: {
        setErrors: (state, action) => {
            console.log(action.payload)
            state.errors = isEmpty(action.payload) ? {} : action.payload
        }
    },
})
export const { setErrors } = errorSlice.actions
export default errorSlice.reducer