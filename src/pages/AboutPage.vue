<template>
  <q-page class="flex flex-center">
    <q-card class="about-card overflow-hidden">
      <img src="/logo.jpg" />
      <q-card-section class="row q-gutter-none q-pa-none">
        <q-btn
          class="col"
          unelevated
          square
          color="blue"
          icon="fa-brands fa-vk"
          href="https://vk.com/hydronautics"
          target="_blank"
        />
        <q-btn
          class="col"
          unelevated
          square
          color="red"
          icon="fa-brands fa-youtube"
          href="https://www.youtube.com/channel/UC0Fo9JXRShJFGhzbZiWTJYQ/featured"
          target="_blank"
        />
        <q-btn
          class="col"
          unelevated
          square
          color="orange"
          icon="fa-brands fa-instagram"
          href="https://instagram.com/hydronautics"
          target="_blank"
        />
        <q-btn
          class="col"
          unelevated
          square
          color="black"
          icon="fa-brands fa-github"
          href="https://github.com/hydronautics-team"
          target="_blank"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { ref } from "vue";

const title = ref("О нас");

useMeta({
  title: title.value,
});
</script>

<style scoped>
.about-card {
  max-width: 400px;
}
</style>
