const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const passport = require('passport')

const { models } = require('../sequelize')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const { User } = models

exports.register = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    const { email, name, password } = req.body

    if (!isValid)
        return res.json({
            status: 1,
            errors
        })

    User.findOne({ where: { email } }).then(user => {
        if (user)
            return res.json({
                status: 1,
                errors: { email: "Email is already in use" }
            })

        User.create({
            email, name, password
        }).then(user => {
            return res.json({
                status: 0,
                user
            })
        }).catch(err => {
            console.log(err)
            return res.json({
                status: 1,
                message: {
                    warning: "Please try again later"
                }
            })
        })
    }).catch(err => {
        console.log(err)
        return res.json({
            status: 1,
            message: {
                warning: "Please try again later"
            }
        })
    })
}

exports.login = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    const { email, password } = req.body

    if (!isValid)
        return res.json({
            status: 1,
            errors
        })

    User.findOne({ where: { email, password } }).then(user => {
        if (!user)
            return res.json({
                status: 1,
                message: {
                    warning: "Invalid User Info"
                }
            })

        const payLoad = { id: user.id, name: user.name, email: user.email }
        jwt.sign(
            payLoad,
            process.env.SECRET_OR_KEY,
            { expiresIn: 360000 },
            (err, token) => {
                return res.json({
                    status: 0,
                    user,
                    token: 'Bearer ' + token
                })
            })
    }).catch(err => {
        console.log(err)
        return res.json({
            status: 1,
            message: {
                warning: "Please try again later"
            }
        })
    })
}