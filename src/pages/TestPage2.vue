<template>
  <q-page>
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
  </q-page>
</template>

<script setup>
import { MiniMap } from "@vue-flow/minimap";
import "@vue-flow/minimap/dist/style.css";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/controls/dist/style.css";
import { computed, ref } from "vue";
import { useVueFlow, VueFlow, Position } from "@vue-flow/core";
import SaveRestoreControls from "./ControlsModule.vue";
import Sidebar from "./SidebarModule.vue";
import { nextTick, watch } from "vue";

const { findNode, onConnect, addEdges, addNodes, project, vueFlowRef } =
  useVueFlow();

const elements = ref([
  {
    id: "1",
    type: "default",
    label: "Node 1",
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  },
]);

var id = 0;
function getId() {
  return `dndnode_${id++}`;
}

function onDragOver(event) {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

function onDrop(event) {
  const type = event.dataTransfer?.getData("application/vueflow");

  const { left, top } = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`,
  };

  addNodes([newNode]);

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(newNode.id);
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
</script>

<style scoped>
.main-field {
  min-height: 650px;
  width: 100%;
}
</style>
