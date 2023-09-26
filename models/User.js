const { Sequelize, DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}