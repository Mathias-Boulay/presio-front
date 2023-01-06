<script setup lang="ts">
import { Button } from 'agnostic-vue'
import { ref, watch } from 'vue';
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";

import CanvasRenderVue from '@/components/editor/CanvasRender.vue';
import ExportDialogVue from '@/components/editor/ExportDialog.vue';
import DeviceEditorVue from '@/components/editor/DeviceEditor.vue';
import ItemSelectorVue from '@/components/editor/ItemSelector.vue';
import AspectRatioSpinnerVue from '@/components/editor/AspectRatioSpinner.vue';
import FloatingDrawerVue from '@/components/FloatingDrawer.vue';
import { mockPres } from '@/assets/ts/mock/mockPres';
import type { Device, LightSource } from '@/assets/ts/Presentation';
import { useRoute } from 'vue-router';
import { getPresentation } from '@/assets/ts/backend/routes';
import type { UserPresentation } from '@/assets/ts/backend/interfaces';
import type { RenderQuality } from '@/assets/ts/interfaces';


const route = useRoute();
if(typeof route.params.id !== 'string')
  throw new Error(`Unexpected params: id=${route.params}`);
  
const userPresentation = await getPresentation(route.params.id);
const aspectRatio = ref(16/9);
const currentDevice = ref<UserPresentation['devices'][0]>();
const currentLight = ref<UserPresentation['lights'][0]>();

const deviceEditor = ref<typeof FloatingDrawerVue | null>(null);
const renderer = ref<typeof CanvasRenderVue | null>(null);

/** Show the drawer with the proper device set */
function editDevice(index: number){
  if(index < 0 || index >= userPresentation.devices.length){
    currentDevice.value = undefined;
    deviceEditor.value?.discard();
  }else{
    currentDevice.value = userPresentation.devices[index];
    deviceEditor.value?.show();
  }
}

/** Show the drawer with the proper light set */
function editLight(index: number){
  if(index < 0 || index >= userPresentation.lights.length){
    currentLight.value = undefined;
  }else{
    currentLight.value = userPresentation.lights[index];
  }
}

/** Export render */
function exportRender(quality: RenderQuality, format: string){
  renderer.value!.exportRender(aspectRatio.value, quality, format);
}
</script>

<template>
<CanvasRenderVue
  ref="renderer"
  :target-aspect-ratio="aspectRatio"
  :presentation="userPresentation"
  />

<div class="editor-overlay">
  <AspectRatioSpinnerVue
    
    @aspect-ratio="(value) => aspectRatio = value"
  />

  <Button data-a11y-dialog-show="export-dialog" >
    Export Render
  </Button>

  
  <ItemSelectorVue
    class="item-selector"
    :presentation="userPresentation"
    @edit-device="editDevice"
    @edit-light="editLight"
   />
  
  <!-- Drawers used to edit a light/ window -->
  <FloatingDrawerVue ref="deviceEditor">
    <DeviceEditorVue
      :device="currentDevice"
     />
  </FloatingDrawerVue>
  
  <!-- The dialog which pops up when exporting the window -->
  <ExportDialogVue
    @export-setting="exportRender"
  />
</div>
</template>

<style scoped>
.editor-overlay {
  margin: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


</style>