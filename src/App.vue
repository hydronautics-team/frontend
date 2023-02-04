<template>
  <router-view />
</template>

<script setup>
import { useWebSocketStore } from "stores/websocket";

const webSocketStore = useWebSocketStore();

webSocketStore.openWs();
setInterval(() => {
  webSocketStore.sendJson();
}, 1000);
</script>
