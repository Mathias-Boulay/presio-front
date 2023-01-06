<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import {Button, ChoiceInput, Dialog } from 'agnostic-vue';
import type { RenderQuality } from '@/assets/ts/interfaces';

let quality = ref<RenderQuality | undefined>(undefined);
let format = ref<string | undefined>(undefined);

let isFilled = computed(() => {
  return quality.value !== undefined && format.value !== undefined;
})

const emit = defineEmits<{
  (e: 'exportSetting', quality: RenderQuality, format: string): void
}>();


function submitExport(event: Event){
  let formData = new FormData((event.target as HTMLFormElement));
  //TODO handle lack of completed fields
  emit('exportSetting', formData.get('quality')!.toString() as RenderQuality, formData.get('format')!.toString());
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
      {name: 'quality', value: 'LOW', label: 'LOW'},
      {name: 'quality', value: 'MEDIUM', label: 'MEDIUM'},
      {name: 'quality', value: 'HIGH', label: 'HIGH'},
    ]"
    legend-label="Quality"
    is-inline
    @change="(choices) => quality = choices[0]"
  />

  <ChoiceInput
    id="export-format"
    type="radio"
    :options="[
      {name: 'format', value:'png', label: 'png'},
      {name: 'format', value:'jpg', label: 'jpg'},
      {name: 'format', value:'webp', label: 'webp'},
    ]"
    legend-label="Format"
    is-inline
    @change="(choices) => format = choices[0]"
  />

  <Button
    mode="primary"
    is-rounded
    type="submit"
    :is-disabled="!isFilled"
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