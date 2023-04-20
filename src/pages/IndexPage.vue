<template>
  <q-page class="flex flex-block items-center">
    <div class="row full-width full-height q-gutter-sm">
      <div class="col">
        <div class="q-gutter-y-sm">
          <main-info v-model="mainValues" />
          <main-info v-model="secondValues" />
          <main-info v-model="thirdValues" color="info" />
          <q-btn @click="sendStart()">Start</q-btn>
          <q-btn @click="sendStop()">Stop</q-btn>
          <q-btn @click="sendReset()">Reset</q-btn>
        </div>
      </div>
      <div class="col-8 col-sm-5 col-md-7 col-lg-8 col-xl-9 self-center">
        <q-card bordered flat>
          <VueFlow
            v-model="missionElements"
            class="main-field"
            fit-view-on-init
          >
            <MiniMap />
            <Controls />
          </VueFlow>
        </q-card>
      </div>
      <div class="col">
        <div class="q-gutter-y-sm">
          <!-- <main-info v-model="mainValues" />
          <main-info v-model="secondValues" /> -->
          <q-btn style="width: 100%">Миссия 1</q-btn>
          <q-btn style="width: 100%">Миссия 2</q-btn>
          <q-btn style="width: 100%">Миссия 3</q-btn>
          <!-- <main-info v-model="thirdValues" color="info" /> -->
          <q-btn style="width: 100%"> Параметры миссии</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import MainInfo from "components/MainInfo.vue";
import { storeToRefs } from "pinia";
import { useWebSocketStore } from "stores/websocket";
import { useMeta } from "quasar";
import { VueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import "@vue-flow/minimap/dist/style.css";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/controls/dist/style.css";
import { ref } from "vue";
import { useMissionStore } from "stores/mission";
import { sendStart } from "src/common/api/todos";
import { sendStop } from "src/common/api/todos";
import { sendReset } from "src/common/api/todos";

useMeta({
  title: "Главная",
});
const { mainValues, secondValues, thirdValues } = storeToRefs(
  useWebSocketStore()
);

const { elements: missionElements } = storeToRefs(useMissionStore());
</script>

<style scoped>
.main-field {
  min-height: 700px;
}
</style>
