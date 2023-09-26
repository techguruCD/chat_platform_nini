import Avatar from '../components/Avatar';
import './Home.scss';

import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from 'emoji-picker-react'
import { logoutUser, lotoutUser, uploadAvatar } from '../store/action/authAction'
import { useEffect, useRef, useState } from 'react';
import { sendMessage } from '../store/action/chatAction';
import ContactModal from '../components/modal/ContactModal';
import { SERVER_URL } from '../config';

const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Verdana',
    'Trebuchet MS',
    'Palatino Linotype',
    'Garamond',
    'Comic Sans MS',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Calibri',
    'Geneva',
    'Century Gothic',
    'Bookman Old Style',
    'Arial Black',
    'Franklin Gothic Medium',
    'Copperplate',
    'Lucida Sans Unicode',
    'Century Schoolbook',
    'Avant Garde',
    'Gill Sans',
    'Brush Script MT',
    'Futura',
    'Rockwell',
    'Monaco',
    'Candara',
    'Cambria',
    'Myriad Pro',
    'Consolas',
    'Perpetua',
    'Arial Narrow',
    'Copperplate Gothic Light',
    'Baskerville',
    'Andale Mono',
    'Corbel',
    'Optima',
    'Baskerville Old Face',
    'Century',
    'Arial Rounded MT Bold',
    'Tw Cen MT',
    'High Tower Text',
    'Ebrima',
    'Engravers MT',
    'Lucida Bright',
    'Constantia',
    'Onyx',
    'MS Reference Sans Serif'
]

const MessageItem = ({ message, mine }) => {
    return <div className='message-item'>
        <div className='message-from'>
            {mine ? 'You' : message.sendUser.name} :
        </div>
        <div className='message-content' dangerouslySetInnerHTML={{ __html: message.content }}></div>
    </div>
}

const Home = () => {
    const [defaultValue, setDefaultValue] = useState('')
    const [content, setContent] = useState('')
    const [show, setShow] = useState(false)
    const target = useSelector(state => state.chat.target)
    const messages = useSelector(state => state.chat.messages)
    const nudgeFlag = useSelector(state => state.chat.nudgeFlag)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const onSignOut = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
    }
    const onSend = (e) => {
        e.preventDefault()
        if (target.id === undefined) return;
        dispatch(sendMessage({ content, receiver: target.id, mode: target.mode }))

        setDefaultValue(' ')
        setTimeout(() => setDefaultValue(''), 1)
        setContent('')
    }
    const sendNudge = (e) => {
        e.preventDefault()
        dispatch(sendMessage({ content: 'Nudge sent', receiver: target.id, type: 1, mode: target.mode}))
    }
    const onAvatarChange = (e) => {
        if (e.target.files[0])
            dispatch(uploadAvatar(e.target.files[0]))
    }
    const onAvatarDelete = (e) => {
        dispatch(uploadAvatar(null))
    }
    const messageListRef = useRef()
    const messageEditRef = useRef()
    const avatarRef = useRef()
    useEffect(() => {
        messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight)
    }, [messages])

    function onClick(emojiData, event) {
        messageEditRef.current.focus();
        document.execCommand('insertText', false, emojiData.emoji)
    }
    return (
        <div className='home-container'>
            <div className={`message-container d-flex flex-column nudge-${nudgeFlag}`}>
                <div className='to-container d-flex'>
                    <div className='to-message-area'>
                        <div className='to-message-address'>
                            <span>To: {target.name}</span>
                        </div>
                        <div className='to-message-history' ref={messageListRef}>
                            {messages.map(message => <MessageItem key={message.id} message={message} mine={message.sender == user.id} />)}
                        </div>
                    </div>
                    <Avatar imageURL={target.mode==1?'/avatar/icons8-multiple-users-80.png':(target.id?(target.avatar?SERVER_URL + target.avatar:'/avatar/online-avatar-online.png'):'/avatar/msn-icon.png')} onClick={handleShow} />
                </div>
                <div className='from-container d-flex'>
                    <div className='from-message-area'>
                        <div className='from-message-address d-flex ps-2'>
                            <Dropdown drop='up'>
                                <Dropdown.Toggle className='font-selector-icon'>
                                    F
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='font-list-container'>
                                    {fontFamilies.map((fontFamily, index) => {
                                        return <Dropdown.Item onClick={e => { messageEditRef.current.focus(); document.execCommand('fontName', false, fontFamily) }} key={index} style={{ fontFamily: fontFamily }}>{fontFamily}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
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
                            <div className='font-selector-icon px-2' onClick={sendNudge}>
                                <img src='/icons8-phone-vibration-96.png'></img>
                            </div>
                        </div>
                        <div className='from-message-history'
                            dangerouslySetInnerHTML={{ __html: defaultValue }}
                            ref={messageEditRef}
                            onPaste={e => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')) }}
                            contentEditable onBlur={e => setContent(e.target.innerHTML)} onInput={e => setContent(e.currentTarget.innerHTML)}>
                        </div>
                        <div className='from-message-toolbar d-flex'>
                            <a className='mx-2 my-auto' onClick={onSignOut}>Sign out</a>
                        </div>
                        <div className='send-button' onClick={onSend}>Send</div>
                    </div>
                    <Avatar mine={true} onDelete={onAvatarDelete} imageURL={user.avatar==null?'/avatar/online-avatar-online.png':SERVER_URL+user.avatar} onClick={(e) => {e.preventDefault(); avatarRef.current.click();}}/>
                    <input type='file' onChange={onAvatarChange} hidden ref={avatarRef}/>
                </div>
            </div>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <ContactModal show={show} setModalShow={setShow} />
        </div>
    );
};

export default Home;