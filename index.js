require('dotenv').config()
const http = require('http')
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const routes = require('./routes')
const sequelize = require('./sequelize')

const ioHandler = require('./ioHandler')

const app = express();
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer, {
    transports: ["websocket"]
})

const PORT = 3000;

app.use(fileUpload())
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/chat', express.static(path.resolve(__dirname, 'client/build')));
app.use('/upload', express.static(path.resolve(__dirname, 'upload')));
app.use('/main', express.static(path.resolve(__dirname, 'client/main')));
app.use('/', routes)
require('./passport')(passport)

io.on('connection', ioHandler.onConnect)

sequelize.authenticate().then(() => {
    console.log('Database connection OK!');
    httpServer.listen(PORT)
}).catch(error => {
    console.log('Unable to connect to the database: ', error)
})