import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setMessages, setContacts, setTarget } from '../slice/chatSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'
import store from '..'
import isEmpty from '../../validation/isEmpty'

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
                const { status, users, errors } = res
                dispatch(setErrors(errors))
                dispatch(setContacts(users))
                if (status == 0) {
                    dispatch(setChatTarget({ id: -1, mode: 1, name: 'Public Chat' }))
                }
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const getMessageList = () => dispatch => {
    return new Promise(resolve => {
        axios.get(SERVER_URL + '/api/chat', { params: store.getState().chat.target })
            .then(({ data: res }) => {
                const { status, messages } = res
                if (status == 0)
                    dispatch(setMessages(messages))
            }).catch(err => {

            })
    })
}

export const setChatTarget = (contact) => dispatch => {
    if (isEmpty(contact)) {
        contact = { name: "MSN Support" }
        dispatch(setTarget(contact))
        dispatch(setMessages([{ id: 0, content: "Welcome", sender: -1, sendUser: {name: 'MSN Support'} }]))
    } else {
        dispatch(setTarget(contact))
        dispatch(getMessageList())
    }
}