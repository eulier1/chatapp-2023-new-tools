<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
// import { useSocket } from '@/composables/useSocket' // Assuming you have the useSocket composable

const username = ref('')
let authenticated = ref(false)
const onlineUsers = ref([])
const messages = ref([])
const newMessage = ref('')
let accessTokenClient = ref('')

// const { socket, connect, disconnect } = useSocket('http://localhost:3000')

const login = () => {
  axios
    .post('http://localhost:3000/login')
    .then((response) => {
      const { accessToken } = response.data
      accessTokenClient.value = accessToken
      authenticated.value = true
    })
    .catch((error) => {
      console.error('Login error:', error)
    })
}

// const sendMessage = () => {
//   socket.emit('message', { text: newMessage.value, username: username.value })
//   messages.value.push({ text: newMessage.value, username: username.value })
//   newMessage.value = ''
// }

// onMounted(() => {
//   connect()

//   socket.on('message', (data) => {
//     messages.value.push(data)
//   })

//   socket.on('onlineUsers', (users) => {
//     onlineUsers.value = users
//   })

//   socket.on('disconnect', () => {
//     authenticated.value = false
//   })
// })

// onBeforeUnmount(() => {
//   disconnect()
// })
</script>

<template>
  <div>
    <template v-if="authenticated">
      <div class="flex">
        <div class="w-1/4">
          <div>
            <h2>Current User: {{ username }}</h2>

            <h2 class="text-lg font-semibold mb-2">Online Users</h2>
            <ul>
              <li v-for="user in onlineUsers" :key="user.id">{{ user.username }}</li>
            </ul>
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
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <input v-model="username" placeholder="Enter your username" />
        <button @click="login">Login</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
