<script setup lang="ts">
import { Button, Drawer } from 'agnostic-vue'
import { ref, watch } from 'vue';
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";

import CanvasRenderVue from '@/components/CanvasRender.vue';
import ExportDialogVue from '@/components/ExportDialog.vue';
import DeviceEditorVue from '@/components/DeviceEditor.vue';
import ItemSelectorVue from '@/components/ItemSelector.vue';
import AspectRatioSpinnerVue from '@/components/AspectRatioSpinner.vue';
import { mockPres } from '@/assets/ts/mock/mockPres';
import type { Device, LightSource } from '@/assets/ts/Presentation';
import { CubeRefractionMapping } from 'three';

const currentPres = mockPres;
const aspectRatio = ref(16/9);

const currentDevice = ref<Device>();
const currentLight = ref<LightSource>();
function editDevice(index: number){
  if(index < 0 || index >= currentPres.devices.length){
    currentDevice.value = undefined;
  }else{
    currentDevice.value = currentPres.devices[index];
  }
}

function editLight(index: number){
  if(index < 0 || index >= currentPres.lights.length){
    currentLight.value = undefined;
  }else{
    currentLight.value = currentPres.lights[index];
  }
}
</script>

<template>
<CanvasRenderVue 
  :target-aspect-ratio="aspectRatio"
  />

<div class="editor-overlay">
  <ExportDialogVue />
  <AspectRatioSpinnerVue
    @aspect-ratio="(value) => aspectRatio = value"
  />

  <Button
  data-a11y-dialog-show="export-dialog"
  
  >
  Test dialog
  </Button>

  
  <ItemSelectorVue
    :presentation="currentPres"
    @edit-device="editDevice"
    @edit-light="editLight"
   />
  
  <!-- Drawers used to edit a light/ window -->
  <Drawer
    id="device-editor-drawer"
    drawer-root="body"
    placement="bottom"
    title="Edit XXX"
  >
    <DeviceEditorVue
      :device="currentDevice"
     />
  </Drawer>
  
</div>
</template>

<style scoped>

</style>