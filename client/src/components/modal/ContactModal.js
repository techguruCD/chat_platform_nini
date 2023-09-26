import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

import { useDispatch, useSelector } from 'react-redux';
import { getContacts, setChatTarget } from '../../store/action/chatAction';

import './ContactModal.scss'

function ContactModal({ show, setModalShow }) {
    const contacts = useSelector(state => state.chat.contacts)
    const target = useSelector(state => state.chat.target)
    const [selectedTarget, setSelectedTarget] = useState(target)
    const [onlineCollapseed, setOnlineCollapsed] = useState(false)
    const [offlineCollapseed, setOfflineCollapsed] = useState(false)
    const dispatch = useDispatch()
    const onHide = (e) => {
        try {
            e.preventDefault()
        } catch (err) {

        }
        setModalShow(false)
    }
    const onOK = (e) => {
        try {
            e.preventDefault()
            dispatch(setChatTarget(selectedTarget))
        } catch (err) {
            console.error(err)
        }
        onHide()
    }
    useEffect(() => {
        if (show) {
            dispatch(getContacts())
        }
    }, [show])
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="my-modal"
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Contacts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='contact-list'>
                    <ListGroup className='px-1' as="ul">
                        <ListGroup.Item as="li" action active={selectedTarget.id == -1} className='d-flex align-items-center public-chat-item'
                            onClick={() => setSelectedTarget({ id: -1, mode: 1, name: 'Public Chat' })}>
                            <img src='/avatar/icons8-multiple-users-80.png' />
                            Public Chat
                        </ListGroup.Item>
                    </ListGroup>
                    <div className='list-container'>
                        <div className='list-caption' onClick={() => setOnlineCollapsed(!onlineCollapseed)}>
                            <img src={!onlineCollapseed ? 'icons8-minus-48.png' : '/icons8-plus-48.png'}></img>
                            <span>Online</span>
                        </div>
                        <ListGroup as="ul" style={{ display: onlineCollapseed ? 'none' : 'flex' }}>
                            {
                                contacts.filter(contact => contact.online).map(contact => {
                                    return <ListGroup.Item as="li" action active={selectedTarget.id == contact.id} key={contact.id} className='d-flex align-items-center' onClick={() => setSelectedTarget(contact)}>
                                        <img src='/online-avatar-online.png' />
                                        {contact.name}
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                    <div className='list-container'>
                        <div className='list-caption' onClick={() => setOfflineCollapsed(!offlineCollapseed)}>
                            <img src={!offlineCollapseed ? 'icons8-minus-48.png' : '/icons8-plus-48.png'}></img>
                            <span>Offline</span>
                        </div>
                        <ListGroup as="ul" style={{ display: offlineCollapseed ? 'none' : 'flex' }}>
                            {
                                contacts.filter(contact => !contact.online).map(contact => {
                                    return <ListGroup.Item as="li" action active={selectedTarget.id == contact.id} key={contact.id} className='d-flex align-items-center' onClick={() => setSelectedTarget(contact)}>
                                        <div className='me-auto'>
                                            <img src='/online-avatar-offline.png' /> {contact.name}
                                        </div>
                                        {/* <Badge bg="secondary" pill>
                                            14
                                        </Badge> */}
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onOK}>OK</Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ContactModal;