<template>
  <q-page class="flex">
    <div>
      Парам парам пам
    </div>
  </q-page>
</template>

<script setup>
import {useMeta} from "quasar";
import {ref} from "vue";

const title = ref("Детали")

useMeta({
  title: title.value
})

</script>
