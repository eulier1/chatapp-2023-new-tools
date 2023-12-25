<template>
  <div>
    <div v-if="authenticated">
      <div v-if="onlineUsers.length > 0">
        <p>Online Users:</p>
        <ul>
          <li v-for="user in onlineUsers" :key="user.id">{{ user.username }}</li>
        </ul>
      </div>
      <div>
        <h2>Chat</h2>
        <div v-for="message in messages" :key="message.id">
          <strong>{{ message.username }}:</strong> {{ message.text }}
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
      </div>
    </div>
    <div v-else>
      <input v-model="username" placeholder="Enter your username" />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSocket } from '@/composables/useSocket' // Create this composable

export default {
  setup() {
    const username = ref('')
    const authenticated = ref(false)
    const onlineUsers = ref([])
    const messages = ref([])
    const newMessage = ref('')

    const { socket } = useSocket('http://localhost:3000') // Replace with your server URL

    const login = () => {
      // Send a request to the server to authenticate the user
      // Set the JWT token in the store if successful
      // (You need to create a composable for HTTP requests)
      // axios.post('http://localhost:3000/login', { username: username.value })
      //   .then((response) => {
      //     const { accessToken } = response.data;
      //     store.commit('setToken', accessToken);
      //     authenticated.value = true;
      //   })
      //   .catch((error) => {
      //     console.error('Login error:', error);
      //   });

      // For simplicity, let's assume successful login
      authenticated.value = true
    }

    const sendMessage = () => {
      // Emit a message event to the server
      socket.emit('message', { text: newMessage.value, username: username.value })
      messages.value.push({ text: newMessage.value, username: username.value })
      newMessage.value = ''
    }

    onMounted(() => {
      // Connect to the socket.io server
      socket.value.connect()

      // Listen for messages from the server
      socket.value.on('message', (data) => {
        messages.value.push(data)
      })

      // Listen for online users from the server
      socket.value.on('onlineUsers', (users) => {
        onlineUsers.value = users
      })

      // Listen for disconnection
      socket.value.on('disconnect', () => {
        authenticated.value = false
      })
    })

    onBeforeUnmount(() => {
      // Disconnect the socket when the component is unmounted
      socket.value.disconnect()
    })

    return {
      username,
      authenticated,
      onlineUsers,
      messages,
      newMessage,
      login,
      sendMessage
    }
  }
}
</script>
