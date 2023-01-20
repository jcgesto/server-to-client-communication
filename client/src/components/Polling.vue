<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL, GET_QUOTE_EVENT_NAME } from '../constants'
import { eventBus } from '../eventBus';

const quote = ref(null)

const waiting = ref(false)

const getQuotePolling = () => {
  waiting.value = true
  let numRetries = 5
  const interval = setInterval(async () => {
    const isReadyForQuoting = (await axios.get<boolean>(`${API_BASE_URL}/polling/ready-for-quoting`)).data
    if (isReadyForQuoting) {
      console.log('Polling: ready for quoting')
      quote.value = (await axios.post(`${API_BASE_URL}/quote`)).data
      clearInterval(interval)
      waiting.value = false
    }
    numRetries--
    if (numRetries === 0) {
      clearInterval(interval)
      waiting.value = false
    }
  }, 5000)
}

eventBus.subscribe(GET_QUOTE_EVENT_NAME, getQuotePolling)
</script>

<template>
  <div>
    <h2>Polling</h2>
    <div v-if="waiting">
      WAITING
    </div>
    <div v-if="quote">
      Quote: {{ quote }}
    </div>
  </div>
</template>
