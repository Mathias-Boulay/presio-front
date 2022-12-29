<script setup lang="ts">
import { Card } from 'agnostic-vue';

const props = defineProps<{
  id: string,
  name: string
}>();

</script>

<template>
<router-link :to="`/editor/${id}`">
  <Card is-animated is-border is-rounded class="p8" >
    <p>{{ name }}</p>
  </Card>
</router-link>
</template>

<style scoped>
</style>