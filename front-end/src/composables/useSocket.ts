import { reactive, shallowRef } from 'vue'
import { Socket, io } from 'socket.io-client'

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
  token: string
  socket: {}
}

export const state: useSocket = reactive({
  connected: false,
  user: {},
  messages: [],
  onlineUsers: [],
  token: '',
  socket: {}
})

export const URL = 'http://localhost:3000'

export const createSocket = (host: string, token: string) => {
  const socket = shallowRef(
    io(URL, {
      auth: {
        token
      }
    })
  )

  socket.value.on('connect', () => {
    state.socket = socket.value
    state.connected = true
  })

  socket.value.on('create_message', ({ text, user }) => {
    const message = { text, username: user.name }
    state.messages.push(message)
  })

  socket.value.on('disconnect', () => {
    state.connected = false
  })

  socket.value.on('users_connected', (users) => {
    state.onlineUsers = users
  })
}
