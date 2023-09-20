import axios from 'axios'
import { setCurrentUser } from '../slice/authSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'

export const loginUser = (param) => async dispatch => {
    try {
        const { data: res } = await axios.post(SERVER_URL + '/api/auth/login', param)
        dispatch(setCurrentUser(res.user))
        dispatch(setErrors(res.errors))
    } catch (err) {
        dispatch(setCurrentUser({}))
    }
}