import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setMessages, setContacts, setTarget } from '../slice/chatSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'
import store from '..'

export const sendMessage = (param) => dispatch => {
    return new Promise(resolve => {
        axios.put(SERVER_URL + '/api/chat', param)
            .then(({ data: res }) => {
                const { status, message, errors } = res
                dispatch(setErrors(errors))
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const getContacts = () => dispatch => {
    return new Promise(resolve => {
        axios.get(SERVER_URL + '/api/chat/contacts')
            .then(({ data: res }) => {
                console.log(res)
                const { status, users, errors } = res
                dispatch(setErrors(errors))
                dispatch(setContacts(users))
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const getMessageList = () => dispatch => {
    return new Promise(resolve => {
        axios.get(SERVER_URL + '/api/chat', {params: store.getState().chat.target})
        .then(({data: res}) => {
            const {status, messages} = res
            console.log(res)
            if (status == 0)
                dispatch(setMessages(messages))
        }).catch(err => {

        })
    })
}

export const setChatTarget = (contact) => dispatch => {
    dispatch(setTarget(contact))
    dispatch(getMessageList())
}