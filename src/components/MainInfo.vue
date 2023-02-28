<template>
  <div>
    <q-markup-table
      separator="horizontal"
      bordered
      flat
      :class="{
        [`bg-${color}`]: color,
      }"
      :dark="dark"
    >
      <tbody>
        <tr v-for="(v, k) of modelValue" :key="k">
          <td class="text-left">{{ v.name }}</td>
          <td :class="units ? 'text-center' : 'text-right'">
            {{ v.value ?? "..." }}
          </td>
          <td class="text-right" v-if="units">{{ v.unit }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
import { useWebSocketStore } from "stores/websocket";
import { storeToRefs } from "pinia";

defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
  },
  units: {
    type: Boolean,
    default: () => false,
  },
  dark: {
    type: Boolean,
    default: () => false,
  },
});
</script>
