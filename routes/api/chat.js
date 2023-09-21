const express = require('express')
const router = express.Router()
const passport = require('passport')
const chatController = require('../../controllers/chat')

router.put('/', passport.authenticate('jwt', { session: false }), chatController.new)
router.get('/', passport.authenticate('jwt', { session: false }), chatController.messageList)
router.get('/contacts', passport.authenticate('jwt', {session: false}), chatController.contactList)

module.exports = router;