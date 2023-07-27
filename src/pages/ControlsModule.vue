<script setup>
import { Panel, useVueFlow, Position } from "@vue-flow/core";
import { apiAxios } from "boot/axios";
import { computed, ref } from "vue";
const flowKey = "example-flow";
const nodesData = ref(null);

const {
  nodes,
  edges,
  addNodes,
  setNodes,
  setEdges,
  addEdges,
  removeNodes,
  removeEdges,
  dimensions,
  setTransform,
  toObject,
  onConnect,
} = useVueFlow();

function saveNodes(data) {
  return apiAxios.post("/nodes", data);
}

onConnect((params) => {
  params.animated = false;
  addEdges([params]);
});

function onSave() {
  apiAxios.post("/nodes", toObject());
  // localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onClear() {
  const nodeIds = nodes.value.map((node) => node.id);
  removeNodes(nodeIds);
  // localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onDelNode() {
  const lastNode = nodes.value[nodes.value.length - 1];
  removeNodes([lastNode]);
}
function onDelEdge() {
  const lastEdge = edges.value[edges.value.length - 1];
  removeEdges([lastEdge]);
}

function onRestore() {
  // const flow = JSON.parse(localStorage.getItem(flowKey));
  apiAxios.get("/nodes").then((response) => {
    const flow = response.data.data[0];
    if (flow) {
      const [x = 0, y = 0] = flow.position;
      setNodes(flow.nodes);
      setEdges(flow.edges);
      setTransform({ x, y, zoom: flow.zoom || 0 });
    }
  });
}

function onAdd() {
  const id = nodes.value.length + 1;
  var lastNode = {};

  if (nodes.value.length !== 0) {
    lastNode = nodes.value[nodes.value.length - 1];
  } else {
    lastNode = {
      id: "1",
      type: "default",
      label: "Node 1",
      position: { x: 0, y: 0 },
      sourcePosition: Position.Right,
    };
  }

  const newNode = {
    id: `${id}`,
    type: "default",
    label: `Node ${id}`,
    position: {
      x: lastNode.position.x + 200,
      y: lastNode.position.y,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };

  addNodes([newNode]);
}
</script>

<template>
  <Panel position="top-right" class="save-restore-controls">
    <div>
      <q-btn class="q-ma-sm" @click="onSave">save</q-btn>
      <q-btn class="q-ma-sm" @click="onRestore"> restore </q-btn>
      <q-btn class="q-ma-sm" @click="onAdd">add node</q-btn>
      <q-btn class="q-ma-sm" @click="onClear">Clear screen</q-btn>
    </div>
    <div>
      <q-btn class="q-ma-sm" @click="onDelNode">Delete last Node</q-btn>
      <q-btn class="q-ma-sm" @click="onDelEdge">Delete last Connection</q-btn>
    </div>
  </Panel>
</template>
