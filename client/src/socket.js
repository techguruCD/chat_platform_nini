import { io } from 'socket.io-client'
import isEmpty from './validation/isEmpty'
import store from './store'
import { SERVER_URL } from './config'
import { addMessage, setTarget, updateContact, updateNugeFlag } from './store/slice/chatSlice'
import toast from './utils/toast'

export const socket = io(isEmpty(SERVER_URL) ? '/' : SERVER_URL, { transports: ["websocket"] })
socket.disconnect()
socket.on('connect', () => {
    socket.emit('userInfo', store.getState().auth.user)
})
const nudgeTimeoutID = 0
socket.on('newMessage', (message) => {
    const { user } = store.getState().auth
    const { target } = store.getState().chat
    if (message.mode == 1 && target.mode == 1 || (message.sender == user.id && message.receiver == target.id || message.sender == target.id && message.receiver == user.id)) {
        if (message.sender != user.id) {
            toast('New message arrived', 'info')
        }
        store.dispatch(addMessage(message))
        if (message.type == 1 && message.sender != user.id) {
            store.dispatch(updateNugeFlag(0))
            setTimeout(() => store.dispatch(updateNugeFlag(1)), 1)
        }
    }
})

socket.on('updateContact', (contact, temp) => {
    store.dispatch(updateContact(contact))
    if (contact.id == store.getState().chat.target.id) {
        store.dispatch(setTarget(contact))
    }
})
export default socket;