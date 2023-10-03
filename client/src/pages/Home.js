import './Home.scss';

import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import EmojiPicker, {
    EmojiStyle,
} from 'emoji-picker-react'
import { logoutUser, lotoutUser, uploadAvatar } from '../store/action/authAction'
import { useEffect, useRef, useState } from 'react';
import { sendMessage, setChatTarget } from '../store/action/chatAction';
import { STATIC_PREFIX } from '../config';

const MessageItem = ({ message, mine }) => {
    return <div className='message-item'>
        <div className='message-from d-flex'>
            <div className='avatar-container'><img src={`${STATIC_PREFIX}/USER ICON.png`}></img></div>
            <div className='contact-name'>{mine ? 'You' : message.sendUser.name} :</div>
        </div>
        <div className='message-content' dangerouslySetInnerHTML={{ __html: message.content }}></div>
    </div>
}

const ContactItem = ({ contact }) => {
    const dispatch = useDispatch();
    const target = useSelector(state => state.chat.target)
    const onSelect = (e) => {
        e.preventDefault();
        dispatch(setChatTarget(contact))
    }

    return (
        <div className={`contact-item d-flex justify-content-between p-2 align-items-center ${target.id == contact.id ? 'active' : ''}`}>
            <div className='contact-info d-flex gap-2'>
                <img src={`${STATIC_PREFIX}/USER ICON.png`}></img>
                <div className='contact-name'>{contact.name}</div>
            </div>
            <div className='chat-button' onClick={onSelect}>
                Chat
            </div>
        </div>
    );
}

const Home = () => {
    const [defaultValue, setDefaultValue] = useState('')
    const [content, setContent] = useState('')
    const [show, setShow] = useState(false)
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const target = useSelector(state => state.chat.target)
    const contacts = useSelector(state => state.chat.contacts)
    const messages = useSelector(state => state.chat.messages)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const onSignOut = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
    }
    const onSend = (e) => {
        e.preventDefault()
        if (target.id === undefined || content == '') return;
        dispatch(sendMessage({ content, receiver: target.id, mode: target.mode }))

        setDefaultValue(' ')
        setTimeout(() => setDefaultValue(''), 1)
        setContent('')
    }
    const messageListRef = useRef()
    const messageEditRef = useRef()
    useEffect(() => {
        messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight)
    }, [messages])

    function onClick(emojiData, event) {
        messageEditRef.current.focus();
        document.execCommand('insertText', false, emojiData.emoji)
    }
    const setSelectedTarget = (contact) => {
        dispatch(setChatTarget(contact))
    }

    const onEntterPressed = (e) => {
        if (e.key == "Enter" && isShiftPressed == false) {
            onSend(e);
        }
    }

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key == 'Shift') setIsShiftPressed(true)
        }
        const onKeyUp = (e) => {
            if (e.key == 'Shift') setIsShiftPressed(false)
        }
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keydown", onkeydown)
            window.removeEventListener("keyup", onkeyup)
        }
    }, [])

    return (
        <div className='home-container'>
            <div className='home-header d-flex'>
                <div className='logo-container'>
                    <img src={`${STATIC_PREFIX}/2004 Messenger Logo.png`}></img>
                </div>
            </div>
            <div className='message-out-container'>
                <div className={`message-container d-flex`}>
                    <div className='message-area d-flex flex-column h-100'>
                        <div className='to-container d-flex'>
                            <div className='to-message-area'>
                                <div className='to-message-history' ref={messageListRef}>
                                    {messages.map(message => <MessageItem key={message.id} message={message} mine={message.sender == user.id} />)}
                                </div>
                            </div>
                        </div>
                        <div className='from-container d-flex'>
                            <div className='from-message-area'>
                                <div className='from-message-address d-flex ps-2'>
                                    <Dropdown drop='up'>
                                        <Dropdown.Toggle className='font-selector-icon px-2'>
                                            😀
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='font-list-container'>
                                            <EmojiPicker
                                                onEmojiClick={onClick}
                                                autoFocusSearch={false}
                                                searchDisabled
                                                emojiStyle={EmojiStyle.NATIVE}
                                                height={300}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='from-message-history'
                                    dangerouslySetInnerHTML={{ __html: defaultValue }}
                                    ref={messageEditRef}
                                    onKeyDown={onEntterPressed}
                                    onPaste={e => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')) }}
                                    contentEditable onBlur={e => setContent(e.target.innerHTML)} onInput={e => setContent(e.currentTarget.innerHTML)}>
                                </div>
                                <div className='from-message-toolbar d-flex'>
                                    <a className='mx-2 my-auto' onClick={onSignOut}>Sign out</a>
                                </div>
                                <div className='send-button' onClick={onSend}>Send</div>
                            </div>
                        </div>
                    </div>
                    <div className='contact-area h-100 overflow-y-auto'>
                        <div className={`public-chat-button ${target.id == -1 ? 'active' : ''}`} onClick={() => setSelectedTarget({ id: -1, mode: 1, name: 'Public Chat' })}>
                            Public Chat
                        </div>
                        <div className='contact-list-container'>
                            {
                                contacts.map((contact, index) => {
                                    return <ContactItem contact={contact} key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
        </div>
    );
};

export default Home;