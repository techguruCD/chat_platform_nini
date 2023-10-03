const path = require('path')
const express = require('express')
const router = express.Router()
const api = require('./api')
const chat = require('./chat')

router.use('/chat', chat)
router.use('/api', api)
// router.get('/chat', (req, res) => {
//     console.log(123)
//     res.sendFile('../client/build/index.html')
// })

router.get('*', (req, res) => {
    res.redirect('/main')
})

module.exports = router;