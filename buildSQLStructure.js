require('dotenv').config()
const sequelize = require('./sequelize')
const fs = require('fs')

sequelize.authenticate().then(() => {
    console.log('Database connection OK!');
    const sql = fs.readFileSync('nini_2004.sql').toString()
    console.log(sql)
    sequelize.query(sql).then(() => {
        console.log('DB structure set')
    }).catch(err => {
        console.log('Error Occured', err)
    })
}).catch(error => {
    console.log('Unable to connect to the database: ', error)
})