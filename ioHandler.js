global.connections = []
let connections = []

const sendUserStatus = (user) => {
    global.connections.forEach(connection => {
        if (connection.user && connection.user.id != user.id)
            connection.emit('updateContact', user)
    })
}

const onConnect = (socket) => {
    console.log("socket connected");
    global.connections.push(socket)
    socket.on('userInfo', (data) => {
        socket.user = data
        sendUserStatus({ ...socket.user, online: true })
    })
    socket.on('disconnect', () => {
        console.log('socket disconnected')
        const index = global.connections.findIndex(connection => connection == socket)
        if (index >= 0) global.connections.splice(index, 1)
        if (socket.user) {
            sendUserStatus({ ...socket.user, online: false })
        }
    })
}

const newMessage = (message) => {
    global.connections.forEach(connection => {
        if (connection.user && (connection.user.id == message.sender || connection.user.id == message.receiver || message.mode == 1)) {
            connection.emit("newMessage", message)
        }
    })
}

const updateUsersWithConnectedState = (_users) => {
    const users = JSON.parse(JSON.stringify(_users))
    users.forEach(user => {
        delete user.password
        user.online = (global.connections.findIndex(connection => connection.user && connection.user.id == user.id) >= 0)
    })
    return users;
}

const isUserConnected = (user) => {
    return global.connections.findIndex(connection => connection.user && connection.user.id == user.id) >= 0
}

module.exports = {
    onConnect,
    newMessage,
    sendUserStatus, 
    updateUsersWithConnectedState,
    isUserConnected
}