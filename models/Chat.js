const { Sequelize, DataTypes, INTEGER } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('Chat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            // allowNull: false
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        read: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        type: { // 0: message 1: nudge
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        mode: { // 0: direct, 1: group
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}