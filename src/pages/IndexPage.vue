<template>
  <q-page class="flex flex-block items-center">
    <div class="row full-width full-height q-gutter-sm">
      <div class="col">
        <div class="q-gutter-y-sm">
          <main-info v-model="mainValues"/>
          <main-info v-model="secondValues"/>
          <main-info v-model="thirdValues" color="info"/>
        </div>
      </div>
      <div class="col-8 col-sm-5 col-md-7 col-lg-8 col-xl-9 self-center">

        <q-card bordered flat>
          <VueFlow v-model="elements" class="main-field">
            <MiniMap/>
            <Controls/>
          </VueFlow>
        </q-card>
      </div>
      <div class="col">
        <div class="q-gutter-y-sm">
          <main-info v-model="mainValues"/>
          <main-info v-model="secondValues"/>
          <main-info v-model="thirdValues" color="info"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import MainInfo from "components/MainInfo.vue";
import {storeToRefs} from "pinia";
import {useWebSocketStore} from "stores/websocket";
import {useMeta} from "quasar";
import {VueFlow} from '@vue-flow/core'
import {MiniMap} from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'
import {Controls} from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import {ref} from "vue";

useMeta({
  title: "Главная"
})
const {mainValues, secondValues, thirdValues} = storeToRefs(useWebSocketStore())

const elements = ref([
  // Nodes
  // An input node, specified by using `type: 'input'`
  {id: '1', type: 'input', label: 'Node 1', position: {x: 250, y: 5}},

  // Default nodes, you can omit `type: 'default'`
  {id: '2', label: 'Node 2', position: {x: 100, y: 100},},
  {id: '3', label: 'Node 3', position: {x: 400, y: 100}},

  // An output node, specified by using `type: 'output'`
  {id: '4', type: 'output', label: 'Node 4', position: {x: 400, y: 200}},

  // Edges
  // Most basic edge, only consists of an id, source-id and target-id
  {id: 'e1-3', source: '1', target: '3'},

  // An animated edge
  {id: 'e1-2', source: '1', target: '2', animated: true},
])
</script>

<style scoped>
.main-field {
  min-height: 700px;
}

</style>