<template>
  <q-page>
    <div>Парам парам пам</div>
    <div>
      <q-list>
        <q-item
          v-for="(v, idx) of todos"
          :key="idx"
          class="text-lowercase"
          :class="{
            'bg-positive': v.completed,
            'bg-negative text-white': !v.completed,
          }"
        >
          id: {{ v.id }}; Пользователь: {{ v.userId }}; Заголовок:
          {{ v.title }};
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { ref } from "vue";
import { todoList } from "src/common/api/todos";

const title = ref("Детали");

useMeta({
  title: title.value,
});

const todos = ref([]);

todoList()
  .then((v) => (todos.value = v.data))
  .catch((e) => console.error(e));
</script>
