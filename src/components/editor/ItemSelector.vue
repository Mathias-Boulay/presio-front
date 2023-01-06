<!--Select all 3d items in the scene, can trigger stuff  -->
<script setup lang="ts">
import { defineProps } from 'vue';
import { Button } from 'agnostic-vue';
import type { Presentation } from '@/assets/ts/Presentation';
import type { UserPresentation } from '@/assets/ts/backend/interfaces';

const props = defineProps<{
  presentation: UserPresentation
}>();

const emit = defineEmits<{
  (e: 'editDevice', deviceIndex: number): void,
  (e: 'editLight',  lightIndex: number): void
}>();


</script>

<template>
<div class="card select-3d-item">
  <Button
    v-for="(light, index) in props.presentation.lights"
    @click="emit('editLight', index)"
    
    >
    {{ light.lightType }} {{ index }}
  </Button>

  <Button
    v-for="(device, index) in props.presentation.devices"
    @click="emit('editDevice', index)"
    data-a11y-dialog-show="device-editor-drawer"
  >
    {{ device.device.name }}
  </Button>
</div>
</template>

<style scoped>
.select-3d-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;

  margin: 1rem;
  gap: 0.5rem;
  justify-content: center;
  margin: auto;
}

.select-3d-item > Button {
  width: min-content;
}
</style>