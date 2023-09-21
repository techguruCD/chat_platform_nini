require('dotenv').config()
const http = require('http')
const express = require('express');
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

const PORT = 5000;

app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/', routes)
require('./passport')(passport)

io.on('connection', ioHandler.onConnect)

sequelize.authenticate().then(() => {
    console.log('Database connection OK!');
    httpServer.listen(PORT)
    // app.listen(PORT, (error) => {
    //     if (!error)
    //         console.log("Server is Successfully Running, and App is listening on port " + PORT)
    //     else
    //         console.log("Error occurred, server can't start", error);
    // });
}).catch(error => {
    console.log('Unable to connect to the database: ', error)
})