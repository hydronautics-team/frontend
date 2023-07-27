<script setup>
function onDragStart(event, nodeType, positionType, nameType) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow", nodeType);
    event.dataTransfer.setData("application/vueflow1", positionType);
    event.dataTransfer.setData("application/vueflow2", nameType);
    event.dataTransfer.effectAllowed = "move";
  }
}
</script>

<template>
  <aside>
    <div class="description text-center">
      You can drag these nodes to the pane.
    </div>

    <div class="nodes row">
      <div
        class="vue-flow__node-input col-3 q-mx-xl"
        :draggable="true"
        @dragstart="onDragStart($event, 'input', 'Right', 'Начало миссии')"
      >
        Начало миссии
      </div>

      <div
        class="vue-flow__node-default col-3 q-mx-xl"
        :draggable="true"
        @dragstart="
          onDragStart($event, 'default', 'Default', 'Плыть 10 метров')
        "
      >
        Плыть 10 метров
      </div>
      <div
        class="vue-flow__node-default col-3 q-mx-xl"
        :draggable="true"
        @dragstart="
          onDragStart(
            $event,
            'default',
            'Default',
            'Развернуться на 90 градусов по часовой'
          )
        "
      >
        Развернуться на 90 градусов по часовой
      </div>
      <div
        class="vue-flow__node-default col-3 q-mx-xl"
        :draggable="true"
        @dragstart="
          onDragStart(
            $event,
            'default',
            'Default',
            'Развернуться на 90 градусов против часовой'
          )
        "
      >
        Развернуться на 90 градусов против часовой
      </div>
      <div
        class="vue-flow__node-default col-3 q-mx-xl"
        :draggable="true"
        @dragstart="
          onDragStart($event, 'default', 'Default', 'Определить ворота')
        "
      >
        Определить ворота
      </div>

      <div
        class="vue-flow__node-output col-3 q-mx-xl"
        :draggable="true"
        @dragstart="onDragStart($event, 'output', 'Left', 'Конец миссии')"
      >
        Конец миссии
      </div>
    </div>
  </aside>
</template>

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
