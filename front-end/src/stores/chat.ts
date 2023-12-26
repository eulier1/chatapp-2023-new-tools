import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    username: '',
    authenticated: false,
    onlineUsers: [],
    messages: [],
    newMessage: '',
    token: ''
  }),
  actions: {
    async login(username) {
      this.username = username
      this.authenticated = true
    },
    sendMessage(message) {
      // Handle sending messages to the server
      this.messages.push(message)
      this.newMessage = ''
    },
    setOnlineUsers(users) {
      this.onlineUsers = users
    },
    disconnect() {
      // Handle disconnection logic
      this.authenticated = false
    }
  }
})
