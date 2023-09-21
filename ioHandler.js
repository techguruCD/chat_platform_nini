global.connections = []
let connections = []
const onConnect = (socket) => {
    console.log("socket connected");
    global.connections.push(socket)
    socket.on('userInfo', (data) => {
        socket.user = data
        global.connections.forEach(connection => {
            if (connection.user.id != data.id)
                connection.emit("updateContact", { ...connection.user, online: true })
        })
    })
    socket.on('disconnect', () => {
        console.log('socket disconnected')
        const index = global.connections.findIndex(connection => connection == socket)
        if (index >= 0) global.connections.splice(index, 1)
        if (socket.user) {
            global.connections.forEach(connection => {
                if (connection.user)
                    connection.emit('updatecontact', { ...socket.user, online: false })
            })
        }
    })
}

const newMessage = (message) => {
    global.connections.forEach(connection => {
        if (connection.userId == message.from_user || connection.userId == message.to_user) {
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

module.exports = {
    onConnect,
    newMessage,
    updateUsersWithConnectedState
}