<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/stingray.png" />
          </q-avatar>
          Stingray
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="Главная" />
        <q-route-tab to="/details" label="Детали" />
        <q-route-tab to="/about" label="О нас" />
      </q-tabs>
    </q-header>

    <q-page-container class="q-px-md">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-secondary text-white" co height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo_footer.png" />
          </q-avatar>
          Гидронавтика
        </q-toolbar-title>
        <pre><q-badge class="connection-badge text-lowercase" :color="statusColor" :text-color="statusColor === 'info' ? 'dark' : 'white'">{{statusText}}</q-badge></pre>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useWebSocketStore } from "stores/websocket";
import { storeToRefs } from "pinia";

const { statusColor, statusText } = storeToRefs(useWebSocketStore());
</script>

<style scoped>
.connection-badge {
  transition: all ease-in-out 200ms;
}
</style>
