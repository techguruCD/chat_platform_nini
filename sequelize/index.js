const { Sequelize } = require('sequelize')
const { applyExtraSetup } = require('./extra-setup')

const sequelize = new Sequelize(
    // process.env.DB_NAME,
    // process.env.DB_USERNAME,
    // process.env.DB_PASSWORD,
    // {
    //     host: process.env.DB_HOST,
    //     dialect: process.env.DB_TYPE
    // }
    'msn_nini',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

const modelDefiners = [
    require('../models/User')
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
}

applyExtraSetup(sequelize)
module.exports = sequelize