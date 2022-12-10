<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Slider from '@vueform/slider'
import type { Device } from '@/assets/ts/Presentation';

const props = defineProps<{
  device: Device | undefined
}>();


</script>

<template>
<div v-if="props.device" class="device-editor">
  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaPosition.x" />
  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaPosition.y" />
  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaPosition.z" />

  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaRotation.roll" />
  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaRotation.pitch" />
  <Slider class="slider" orientation="vertical" :tooltips="false" v-model="props.device.deltaRotation.yaw" />
</div>
</template>


<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.device-editor {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  height: 20vh; 
}

.slider {
  height: 100%;
}
</style>