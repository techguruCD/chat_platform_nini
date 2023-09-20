import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import errorReducer from './slice/errorSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer
  },
})