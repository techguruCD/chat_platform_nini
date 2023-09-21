import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import isEmpty from "../../validation/isEmpty";

export const chatSlice = createSlice({
    name: 'auth',
    initialState: {
        messages: [],
        target: {},
        contacts: [],
        nudgeFlag: 0
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessage: (state, action) => {
            if (state.contacts.findIndex(contact => contact.id == action.payload.id) < 0)
                state.messages = [...state.messages, action.payload]
        },
        setContacts: (state, action) => {
            state.contacts = action.payload
        },
        addContact: (state, action) => {
            state.contacts = [...state.contacts, action.payload]
        },
        updateContact: (state, action) => {
            const index = state.contacts.findIndex(contact => contact.id == action.payload.id)
            if (index < 0)
                state.contacts = [...state.contacts, action.payload]
            else {
                state.contacts = [...state.contacts.slice(0, index), action.payload, ...state.contacts.slice(index + 1, state.contacts.length)]
            }
        },
        setTarget: (state, action) => {
            state.target = action.payload
        },
        updateNugeFlag: (state, action) => {
            state.nudgeFlag = action.payload
        }
    },
})
export const { setMessages, addMessage, setContacts, addContact, updateContact, setTarget, updateNugeFlag } = chatSlice.actions
export default chatSlice.reducer