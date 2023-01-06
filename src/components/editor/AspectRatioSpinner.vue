<script setup lang="ts">
import { defineEmits } from 'vue';
import { Select } from 'agnostic-vue';
import type { SelectOption } from 'agnostic-vue/dist/types/SelectApi';

const emit = defineEmits<{
  (e: 'aspect-ratio', value: number): void
}>();

const ratios : SelectOption[] = [
  {label: '16:9', value: (16/9).toString()},
  {label: '9:16', value: (9/16).toString()},
  {label: '4:3', value: (4/3).toString()},
]

</script>

<template>
<Select
 :options="ratios"
 default-option-label="Export aspect ratio"
 unique-id="aspect-ratio-spinner"
 name="aspect-ratio-spinner"
 label-copy="Select ratio"
 @selected="(value) => emit('aspect-ratio', parseFloat(value as string))"
 />
</template>

<style scoped>
.editor-overlay {
  height: 100%;
  z-index: 999 ;
}

p {
  color: aliceblue;
}

</style>