<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";

</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped>

</style>
