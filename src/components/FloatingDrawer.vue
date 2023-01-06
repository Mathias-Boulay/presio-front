<script setup lang="ts">
import { Card } from 'agnostic-vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

let drawer = ref<HTMLElement| null>(null);

let dynamicClasses = ref("hidden");

function addIfAbsent(name: string){
  if(!dynamicClasses.value.includes(name)){
    dynamicClasses.value = `${name} ${dynamicClasses}`
  }
}

function show(){
  dynamicClasses.value = dynamicClasses.value.replace('hidden', ' ');
}

function discard(){
  addIfAbsent('hidden ')
}

// Not the most efficient approach
onClickOutside(drawer, (event) => {
  discard();
});

defineExpose({
  show,
  discard
});
</script>

<template>
  <Card
  ref="drawer"
  class="floating-drawer"
  :class="dynamicClasses"
  is-shadow
  is-border
  is-rounded
  >
    <slot></slot>
  </Card>

</template>

<style scoped>
.floating-drawer {
  position: fixed;
  width: calc(100vw - 1rem);
  height: 30vh;
  
  bottom: 0.5rem;
  left: 0.5rem;

  padding: 0.35rem;

  background-color: var(--agnostic-light);
}

.hidden {
  display: none;
}
</style>