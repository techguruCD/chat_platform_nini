import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import errorReducer from './slice/errorSlice'
import chatReducer from './slice/chatSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    chat: chatReducer
  },
})