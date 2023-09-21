import { io } from 'socket.io-client'
import isEmpty from './validation/isEmpty'
import store from './store'
import { SERVER_URL } from './config'
import { addMessage, setTarget, updateContact, updateNugeFlag } from './store/slice/chatSlice'

export const socket = io(isEmpty(SERVER_URL) ? '/' : SERVER_URL, { transports: ["websocket"] })
socket.disconnect()
socket.on('connect', () => {
    socket.emit('userInfo', store.getState().auth.user)
})
const nudgeTimeoutID = 0
socket.on('newMessage', (message) => {
    if (message.sender == store.getState().auth.user.id || message.receiver == store.getState().auth.user.id &&
        message.sender == store.getState().chat.target.id || message.receiver == store.getState().chat.target.id)
        store.dispatch(addMessage(message))
    if (message.type == 1 && message.receiver == store.getState().auth.user.id) {
        store.dispatch(updateNugeFlag(0))
        setTimeout(() => store.dispatch(updateNugeFlag(1)), 1)
    }
})

socket.on('updateContact', (contact, temp) => {
    store.dispatch(updateContact(contact))
    if (contact.id == store.getState().chat.target.id) {
        store.dispatch(setTarget(contact))
    }
})
export default socket;