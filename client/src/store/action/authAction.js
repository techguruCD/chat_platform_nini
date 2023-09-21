import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setCurrentUser } from '../slice/authSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'
import socket from '../../socket'
import setAuthToken from '../../utils/setAuthToken'

export const loginUser = (param) => dispatch => {
    return new Promise(resolve => {
        axios.post(SERVER_URL + '/api/auth/login', param)
            .then(({ data: res }) => {
                const { status, token, errors } = res
                dispatch(setErrors(errors))
                localStorage.setItem('jwtToken', token)
                setAuthToken(token)
                try {
                    const decoded = jwt_decode(token)
                    dispatch(setCurrentUser(decoded))
                    socket.connect()
                } catch (err) {
                    dispatch(setCurrentUser({}))
                }
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    socket.disconnect()
}

export const registerUser = (param) => dispatch => {
    return new Promise(resolve => {
        axios.put(SERVER_URL + '/api/auth/register', param)
            .then(({ data: res }) => {
                const {status, user, errors} = res
                dispatch(setErrors(errors))
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}