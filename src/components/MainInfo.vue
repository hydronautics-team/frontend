<template>
  <div>
    <div v-for="(v, k) of lastValuesString" :key="k">
      {{ k }}: {{ v }}
    </div>
  </div>
</template>

<script setup>

import {useWebSocketStore} from "stores/websocket";
import {storeToRefs} from "pinia";

const {lastValuesString} = storeToRefs(useWebSocketStore())

</script>
