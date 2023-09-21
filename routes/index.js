const path = require('path')
const express = require('express')
const router = express.Router()
const api = require('./api')

router.use('/api', api)
router.get('*', (req, res) => {
    res.redirect('/')
})

module.exports = router;