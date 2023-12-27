import { reactive } from 'vue'
import { io } from 'socket.io-client'

interface Message {
  text: string
  username: string
}

interface User {
  name: string
  userId: string
  email: string
}
interface useSocket {
  connected: boolean
  user: {}
  messages: Array<Message>
  onlineUsers: User[]
}

export const state: useSocket = reactive({
  connected: false,
  user: {},
  messages: [],
  onlineUsers: []
})

const URL = 'http://localhost:3000'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('create_message', ({ text, user }) => {
  const message = { text, username: user.name }
  state.messages.push(message)
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('users_connected', (users) => {
  state.onlineUsers = users
})
