<script setup lang="ts">
import { ref } from 'vue'
import { eventBus } from '../eventBus';
import { API_BASE_URL, GET_QUOTE_EVENT_NAME } from '../constants'
import axios from 'axios';

const quote = ref(null)

const waiting = ref(false)

const getSSEQuote = () => {
  waiting.value = true
  const eventSource = new EventSource(`${API_BASE_URL}/sse/ready-for-quoting`);
  eventSource.onmessage = async (event) => {
    const isReadyForQuoting = event.data
    if (isReadyForQuoting) {
      console.log('SSE: ready for quoting')
      quote.value = (await axios.post(`${API_BASE_URL}/quote`)).data
      waiting.value = false
    }
    eventSource.close()
  }
}

eventBus.subscribe(GET_QUOTE_EVENT_NAME, getSSEQuote)
</script>

<template>
  <div>
    <h2>SSE</h2>
    <div v-if="waiting">
      WAITING
    </div>
    <div v-if="quote">
      Quote: {{ quote }}
    </div>
  </div>
</template>
