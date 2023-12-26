import { messageHandler } from "./messages/handler.js";

const users = []

export const ioConnections = ({io}) => (socket) => {

    console.log('User connected:', socket.id);
    users.push(socket.id)
    console.log(users.length)
    
    // Mmessages
    socket.on('message', messageHandler({io}));

    // Handle disconnection
    socket.on('disconnect', () => {
        const userIdIndex = users.findIndex( (userid) => userid === socket.id)
        users.splice(userIdIndex, 1)
        console.log('User disconnected:', socket.id);
        console.log(users.length)
    });
}