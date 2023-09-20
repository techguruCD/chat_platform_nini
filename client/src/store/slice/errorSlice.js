import { createSlice } from '@reduxjs/toolkit'
export const errorSlice = createSlice({
  name: 'error',
  initialState: {},
  reducers: {
    setErrors: (state, errors) => {
        state = errors
    }
  },
})
export const { setErrors } = errorSlice.actions
export default errorSlice.reducer