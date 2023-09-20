require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes')
const sequelize = require('./sequelize')

const app = express();
const PORT = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

sequelize.authenticate().then(() => {
    console.log('Database connection OK!');
    app.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully Running, and App is listening on port " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    });
}).catch(error => {
    console.log('Unable to connect to the database: ', error)
})