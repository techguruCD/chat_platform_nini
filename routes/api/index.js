const express = require('express')
const router = express.Router()
const auth = require('./auth')
const chat = require('./chat')

router.use('/auth', auth)
router.use('/chat', chat)

module.exports = router;