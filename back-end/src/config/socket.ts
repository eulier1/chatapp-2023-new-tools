import { createMessage } from "../handlers/message";

const users = []

export const ioConnections = ({io}) => async (socket) => {

    users.push(socket.id)
    io.emit('users_connected', users)
    
    // Mmessages
    socket.on('create_message', createMessage(io));

    // Handle disconnection
    socket.on('disconnect', () => {
        const userIdIndex = users.findIndex( (userid) => userid === socket.id)
        users.splice(userIdIndex, 1)
        io.emit('users_connected', users)
    });
}