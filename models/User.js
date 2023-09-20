const { Sequelize, DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}