const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../../controllers/auth')

router.post('/login', authController.login)
router.put('/register', authController.register)
router.post('/avatar', passport.authenticate('jwt', { session: false }), authController.updateAvatar)

module.exports = router;