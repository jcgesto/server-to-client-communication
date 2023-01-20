<script setup lang="ts">
import Polling from './components/Polling.vue';
import SocketIO from './components/SocketIO.vue';
import SSE from './components/SSE.vue';
import CreateUser from './components/CreateUser.vue';
</script>

<template>
  <div>
    <h1>Server data push POC</h1>
    <p>This is a POC to test various implementations of sending information from the server to a web client.</p>
    <div>
      <CreateUser></CreateUser>
    </div>
    <Polling></Polling>
    <SocketIO></SocketIO>
    <SSE></SSE> 
  </div>
</template>
