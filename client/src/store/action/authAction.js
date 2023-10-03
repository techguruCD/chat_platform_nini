import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setCurrentUser } from '../slice/authSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'
import socket from '../../socket'
import setAuthToken from '../../utils/setAuthToken'
import { getContacts, setChatTarget } from './chatAction'
import { updateNugeFlag } from '../slice/chatSlice'

export const loginUser = (param) => dispatch => {
    return new Promise(resolve => {
        axios.post(SERVER_URL + '/api/auth/login', param)
            .then(({ data: res }) => {
                const { status, token, errors } = res
                dispatch(setErrors(errors))
                if (!status) {
                    localStorage.setItem('jwtToken', token)
                    setAuthToken(token)
                    try {
                        const decoded = jwt_decode(token)
                        dispatch(updateNugeFlag(0))
                        dispatch(setCurrentUser(decoded))
                        socket.connect()
                        dispatch(setChatTarget({}))
                        dispatch(getContacts())
                    } catch (err) {
                        dispatch(setCurrentUser({}))
                    }
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
                const { status, user, errors } = res
                dispatch(setErrors(errors))
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const uploadAvatar = (param) => dispatch => {
    return new Promise(resolve => {
        var formData = new FormData()
        formData.append('avatar', param)
        axios.post(SERVER_URL + '/api/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(({ data: res }) => {
                const { status, user } = res;
                if (user) {
                    dispatch(setCurrentUser(user))
                }
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}