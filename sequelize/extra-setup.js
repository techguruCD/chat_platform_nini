function applyExtraSetup(sequelize) {
    const { User, Chat } = sequelize.models;

    Chat.belongsTo(User, {as: 'receiveUser', foreignKey: 'receiver'})
    Chat.belongsTo(User, {as: 'sendUser', foreignKey: 'sender'})
    // User.belongsTo(Chat, )
    // Chat.hasMany(User, {as: ''});
    // User.belongsTo(Chat);
}

module.exports = { applyExtraSetup }