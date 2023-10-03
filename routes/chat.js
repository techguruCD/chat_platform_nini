const path = require('path')
const express = require('express')
const router = express.Router()
const api = require('./api')

router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})

module.exports = router;