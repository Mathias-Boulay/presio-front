<script setup lang="ts">
import GoToAppButtonVue from '@/components/GoToAppButton.vue';
import { Divider } from 'agnostic-vue';

</script>

<template>
  <main class="main-content">
    <section class="main-section">
      <h1>Presio</h1>
      <h3>Your best opening slide</h3>
    
      <GoToAppButtonVue/>
    </section>

    <Divider />

    <section class="main-section">
      <h3>A new way</h3>
      <img alt="Logo" src="http://placekitten.com/200/200" />
      <p>Make an impression on your audience with your shiny new project, now on devices</p>
      
    </section>
    <Divider />

    <section class="main-section">
      <h3>Easy integration</h3>
      <img alt="Logo" src="http://placekitten.com/200/200" />
      <p>You can export in many formats, making integration with your workflow effortless</p>
    </section>
     
    
  </main>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: stretch  ;

  padding: 1rem;
}

.main-section {
  margin-top: 1rem;
  margin-bottom: 1.2rem;
}

.main-section h3 {
  margin-bottom: 0.7rem;
}

.main-section img {
  display: block;
  margin: auto;
  width: 10rem;
  height: auto;
  margin-bottom: 0.7rem ;
}
</style>
