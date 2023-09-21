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
    const { receiver, content, type } = req.body;
    const sender = req.user.id;
    if (!isValid)
        return res.json({
            status: 1,
            errors
        })
    if (sender == receiver || !receiver)
        return res.json({
            status: 1,
            errors: { content: "Please select receiver" }
        })
    Chat.create({
        content, receiver, sender, type
    }).then(message => {
        ioHandler.newMessage(message)
        return res.json({
            status: 0
        })
    }).catch(err => {
        return res.json({
            status: 1,
            message: { warning: 'Please try again later' }
        })
    })
}

exports.messageList = (req, res) => {
    const { id } = req.query;
    if (!id)
        return res.json({
            status: 1,
            message: { warning: 'Please select contact' }
        })
    Chat.findAll({
        where: {
            [Sequelize.Op.or]: [
                {
                    sender: req.user.id,
                    receiver: Number(id)
                },
                {
                    sender: id,
                    receiver: Number(req.user.id)
                },
            ]
        }
    }).then(messages => {
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