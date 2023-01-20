<script setup lang="ts">
import { ref } from 'vue'
import { io } from 'socket.io-client'
import { API_BASE_URL, GET_QUOTE_EVENT_NAME } from '../constants';
import { eventBus } from '../eventBus';
import axios from 'axios';

const quote = ref(null)

const waiting = ref(false)

const getSocketIOQuote = () => {
  waiting.value = true
  const socket = io(API_BASE_URL)
  socket.on('userReadyForQuoting', async (data) => {
    console.log('event received', data)
    const isReadyForQuoting = data
    if (isReadyForQuoting) {
      quote.value = (await axios.post(`${API_BASE_URL}/quote`)).data
    }
    socket.disconnect()
    waiting.value = false
  })
}

eventBus.subscribe(GET_QUOTE_EVENT_NAME, getSocketIOQuote)
</script>

<template>
  <div>
    <h2>Socket IO</h2>
    <div v-if="waiting">
      WAITING
    </div>
    <div v-if="quote">
      Quote: {{ quote }}
    </div>
  </div>
</template>
