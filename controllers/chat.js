const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validateChatInput = require('../validation/chat')
const ioHandler = require('../ioHandler')

const { Sequelize } = require("sequelize")
const { models } = require('../sequelize')
const { User, Chat } = models
exports.new = (req, res) => {
    const { errors, isValid } = validateChatInput(req.body)
    const { receiver, content, type, mode } = req.body;
    const sender = req.user.id;
    if (!isValid)
        return res.json({
            status: 1,
            errors
        })
    if ((sender == receiver && mode == 1) || (!receiver && mode == 1))
        return res.json({
            status: 1,
            errors: { content: "Please select receiver" }
        })

    const newChat = () => {
        Chat.create({
            content, receiver, sender, type, mode
        }).then(message => {
            Chat.findOne({
                where: { id: message.id },
                include: {
                    model: User,
                    as: 'sendUser',
                    attributes: ['id', 'name', 'avatar']
                }
            }).then(message => {
                ioHandler.newMessage(message)
                return res.json({
                    status: 0
                })
            }).catch(err => {
                console.log(err)
                return res.json({
                    status: 1,
                    message: { warning: 'Please try again later' }
                })
            })
        }).catch(err => {
            console.log(err)
            return res.json({
                status: 1,
                message: { warning: 'Please try again later' }
            })
        })
    }
    if (mode == 0) {
        User.findOne({ where: { id: receiver } }).then(user => {
            if (!user)
                return res.json({
                    status: 1,
                    message: { warning: 'Invalid receiver' }
                })
            newChat()
        }).catch(err => {
            return res.json({
                status: 1,
                message: { warning: 'Please try again later' }
            })
        })
    } else {
        newChat();
    }
}

exports.messageList = (req, res) => {
    const { id, mode = 0 } = req.query;
    if (!id)
        return res.json({
            status: 1,
            message: { warning: 'Please select contact' }
        });
    (mode == 0 ?
        Chat.findAll({
            where: {
                [Sequelize.Op.or]: [
                    {
                        sender: req.user.id,
                        receiver: id
                    },
                    {
                        sender: id,
                        receiver: req.user.id
                    },
                ]
            },
            include: {
                model: User,
                as: 'sendUser',
                attributes: ['id', 'name', 'avatar']
            }
        }) : Chat.findAll({
            where: {
                mode
            },
            include: {
                model: User,
                as: 'sendUser',
                attributes: ['id', 'name', 'avatar']
            }
        })).then(messages => {
            return res.json({
                status: 0,
                messages
            })
        }).catch(err => {
            console.log(err)
            return res.json({
                status: 1,
                message: { warning: 'Please try again later' }
            })
        })
}

exports.contactList = (req, res) => {
    User.findAll({ where: { id: { [Sequelize.Op.not]: req.user.id } } }).then(users => {
        users = ioHandler.updateUsersWithConnectedState(users)
        return res.json({
            status: 0,
            users
        })
    }).catch(err => {
        console.log(err)
        return res.json({
            status: 1,
            message: { warning: 'Please try again later' }
        })
    })
}