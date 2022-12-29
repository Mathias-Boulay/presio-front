<script setup lang="ts">
import { Suspense } from 'vue';
import UserPresentationsVue from '@/components/UserPresentations.vue';
import LogoVue from '@/components/icons/Logo.vue';
</script>

<template>
<main>
  <LogoVue />
  <Suspense>
    <UserPresentationsVue />
  </Suspense>

</main>
</template>

<style scoped>
</style>