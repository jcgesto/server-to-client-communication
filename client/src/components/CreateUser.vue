<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { API_BASE_URL, GET_QUOTE_EVENT_NAME } from '../constants';
import { eventBus } from '../eventBus';

const getQuotesDisabled = ref(true)

const createUser = async () => {
  await axios.post(`${API_BASE_URL}/user`)
  getQuotesDisabled.value = false
}
const getQuotes = () => {
  eventBus.emit(GET_QUOTE_EVENT_NAME)
}
</script>

<template>
  <div>
    <h2>Create user</h2>
    <p>
      <strong>
        First click on "create user"
      </strong>
    </p>
    <div>
      <button @click="createUser">Create user</button>
    </div>
    <div>
      <button @click="getQuotes" :disabled="getQuotesDisabled">get Quotes</button>
    </div>
  </div>
</template>
