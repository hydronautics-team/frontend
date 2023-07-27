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
          <div class="dndflow" @drop="onDrop">
            <VueFlow
              v-model="elements"
              @dragover="onDragOver"
              class="main-field"
              fit-view-on-init
            >
              <SaveRestoreControls />
              <MiniMap />
              <Controls />
            </VueFlow>
            <Sidebar />
          </div>
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
import { MiniMap } from "@vue-flow/minimap";
import "@vue-flow/minimap/dist/style.css";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/controls/dist/style.css";
import { ref } from "vue";
import { useMissionStore } from "stores/mission";
import { sendStart } from "src/common/api/todos";
import { sendStop } from "src/common/api/todos";
import { sendReset } from "src/common/api/todos";
import "@vue-flow/minimap/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import { useVueFlow, VueFlow, Position } from "@vue-flow/core";
import SaveRestoreControls from "./ControlsModule.vue";
import Sidebar from "./SidebarModule.vue";
import { nextTick, watch } from "vue";

const { findNode, nodes, onConnect, addEdges, addNodes, project, vueFlowRef } =
  useVueFlow();

const elements = ref([]);

function getId() {
  return nodes.value.length + 1;
}

function onDragOver(event) {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

function onDrop(event) {
  const type = event.dataTransfer?.getData("application/vueflow");
  const positionType = event.dataTransfer?.getData("application/vueflow1");
  const nameType = event.dataTransfer?.getData("application/vueflow2");

  const { left, top } = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  if (positionType === "Right") {
    const newNode = {
      id: getId(),
      type,
      position,
      sourcePosition: Position.Right,
      label: `${nameType}`,
    };
    addNodes([newNode]);
  } else if (positionType === "Default") {
    const newNode = {
      id: getId(),
      type,
      position,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      label: `${nameType}`,
    };
    addNodes([newNode]);
  } else {
    const newNode = {
      id: getId(),
      type,
      position,
      targetPosition: Position.Left,
      label: `${nameType}`,
    };
    addNodes([newNode]);
  }

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(nodes.value[nodes.value.length - 1].id);
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2,
          };
          stop();
        }
      },
      { deep: true, flush: "post" }
    );
  });
}

useMeta({
  title: "Главная",
});
const { mainValues, secondValues, thirdValues } = storeToRefs(
  useWebSocketStore()
);
</script>

<style scoped>
.main-field {
  min-height: 650px;
  width: 100%;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.dndflow {
  flex-direction: column;
  display: flex;
  height: 100%;
}
.dndflow aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
}
.dndflow aside .nodes > * {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 10px 2px #00000040;
}
.dndflow aside .description {
  margin-bottom: 10px;
}
.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}
</style>
