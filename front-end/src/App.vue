<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { socket, state } from '@/composables/useSocket' // Assuming you have the useSocket composable

const username = ref('')
let authenticated = ref(false)
const onlineUsers = computed(() => state.onlineUsers)
const messages = computed(() => state.messages)
const newMessage = ref('')
let user: Ref<{
  id: string
  name: string
  userId: string
  email: string
}> = ref('')
let accessTokenClient = ref('')

const login = () => {
  axios
    .post('http://localhost:3000/login', { username: username.value })
    .then((response) => {
      const { accessToken, newUser } = response.data
      accessTokenClient.value = accessToken
      authenticated.value = true
      user.value = newUser
    })
    .catch((error) => {
      console.error('Login error:', error)
    })
}

const sendMessage = () => {
  socket.emit('create_message', { text: newMessage.value, user: user.value })
  newMessage.value = ''
}
</script>

<template>
  <div>
    <template v-if="authenticated">
      <div class="flex">
        <div class="w-1/4">
          <div>
            <h1>Current User: {{ username }}</h1>
            <p>connected? : {{ socket.connected ? '🟢' : '🔴' }}</p>
            <br />
            <h2 class="text-lg font-semibold mb-2">
              Online Users: <strong />{{ onlineUsers.length }}<strong />
            </h2>
          </div>
        </div>
        <div class="w-3/4">
          <div>
            <h2 class="text-lg font-semibold mb-2">Chat</h2>
            <div v-for="message in messages" :key="message.id">
              <strong>{{ message.username }}:</strong> {{ message.text }}
            </div>
            <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Type your message..."
              type="text"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <input v-model="username" @keyup.enter="login" placeholder="Enter your username" />
        <button @click="login">Login</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
