<script setup lang="ts">
import { defineEmits } from 'vue';
import {Button, ChoiceInput, Dialog } from 'agnostic-vue';

const emit = defineEmits<{
  (e: 'exportSetting', quality: string, format: string): void
}>();


function submitExport(event: Event){
  let formData = new FormData((event.target as HTMLFormElement));
  //TODO handle lack of completed fields
  emit('exportSetting', formData.get('quality')!.toString(), formData.get('format')!.toString());
}
</script>

<template>
<Dialog
  id="export-dialog"
  dialog-root="body"
  :is-animation-fade-in="true"
  role="dialog"
  
>
<template #title> Export render</template>
<form class="exportDialog" @submit.prevent="submitExport">
  
  <ChoiceInput 
    id="export-quality"
    type="radio"
    :options="[
      {name: 'quality', value: 'low', label: 'low'},
      {name: 'quality', value: 'medium', label: 'medium'},
      {name: 'quality', value: 'high', label: 'high'},
    ]"
    legend-label="Quality"
    is-inline
  />

  <ChoiceInput
    id="export-format"
    type="radio"
    :options="[
      {name: 'format', value:'jpg', label: 'jpg'},
      {name: 'format', value:'webp', label: 'webp'},
    ]"
    legend-label="Format"
    is-inline
  />

  <Button
    mode="primary"
    is-rounded
    type="submit"
  >
  Export !
  </Button>
</form>
</Dialog>

</template>

<style scoped>
.exportDialog{
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>