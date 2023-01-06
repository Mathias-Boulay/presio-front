<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Slider from '@vueform/slider'
import { Button } from 'agnostic-vue';
import type { Device } from '@/assets/ts/Presentation';
import type { UserPresentation } from '@/assets/ts/backend/interfaces';
import { FORM_FILE, FORM_UUID } from '@/assets/ts/utils/constants';
import { uploadDeviceImage } from '@/assets/ts/backend/routes';

const props = defineProps<{
  device: UserPresentation['devices'][0] | undefined
}>();

/**
 * Note:
 * The values on the device stored for the user presentation
 * are a delta of the original device.
 */
const maxDeltaPosition = 10;
const minDeltaPosition = -maxDeltaPosition;


const maxDeltaRotation = 5;
const minDeltaRotation = -maxDeltaRotation;

const inputUploader = ref<typeof HTMLElement | null>(null);

/**Called by the button */
function triggerFileSelector(){
  //@ts-ignore, The click function IS defined by HTMLElement.
  inputUploader.value?.click();
}

function handleFileUpload(event: Event){
  const element = event.target as HTMLInputElement;
  const file = element.files?.[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log(reader.result)

    uploadDeviceImage((reader.result as string), props.device!.id);
  });

  reader.readAsDataURL(file!)
}

</script>

<template>
<div v-if="props.device"  class="device-editor">
  <Slider class="slider" :min="minDeltaPosition" :max="maxDeltaPosition" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.x" />
  <Slider class="slider" :min="minDeltaPosition" :max="maxDeltaPosition" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.y" />
  <Slider class="slider" :min="minDeltaPosition" :max="maxDeltaPosition" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.z" />

  <Slider class="slider" :min="minDeltaRotation" :max="maxDeltaRotation" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.roll" />
  <Slider class="slider" :min="minDeltaRotation" :max="maxDeltaRotation" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.pitch" />
  <Slider class="slider" :min="minDeltaRotation" :max="maxDeltaRotation" orientation="vertical" :tooltips="false" :lazy="false" v-model="props.device.yaw" />
  
  <label for="upload-file">
    <Button @click="triggerFileSelector" >Upload<br/>Image</Button>
    <input ref="inputUploader" class="file-upload" type="file" id="upload-file" name="upload-file" accept="image/png, image/jpeg" @change="handleFileUpload( $event )"/>
  </label>
  
</div>


</template>


<style src="@vueform/slider/themes/default.css"></style>

<style scoped>

/* Hide the element */
.file-upload{
  position: absolute;
  top: -1000px;
}

.device-editor {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  
  width:100%
}

.image-selector{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
}

.slider {
  height: 25vh;
}

.small-title {
  text-align: center;
}
</style>