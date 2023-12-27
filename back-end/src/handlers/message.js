export const messageHandler = ({io}) => ({data}) => {
    io.emit('message', data); // Broadcast the message to all connected clients
  }