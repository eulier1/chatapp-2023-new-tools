import { ref } from 'vue'
import { io } from 'socket.io-client'

export function useSocket(serverUrl) {
  const socket = ref(null)

  // Connect to the socket server
  const connect = () => {
    socket.value = io(serverUrl)
  }

  // Disconnect from the socket server
  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect()
    }
  }

  // Expose the socket instance
  return {
    socket,
    connect,
    disconnect
  }
}
