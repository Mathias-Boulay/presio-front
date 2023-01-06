<script setup lang="ts">
import { Suspense } from 'vue';
import UserPresentationsVue from '@/components/UserPresentations.vue';
import ModelPresentationsVue from '@/components/ModelPresentations.vue';
import LogoVue from '@/components/icons/Logo.vue';
import { Divider } from 'agnostic-vue';
import { Button } from 'agnostic-vue';

import { useUserStore } from '@/stores/user';
const store = useUserStore();
</script>

<template>
<main>
  <LogoVue />
  <Suspense>
    <UserPresentationsVue />
  </Suspense>

  <Divider  class="divider"/>

  <Suspense>
    <ModelPresentationsVue />
  </Suspense>

  <section v-if="store.hasPerm('PERM_ADMIN')">
    <Divider class="divider" />
    <h3>Super secret panel</h3>
    <router-link to="/administration">
      <Button class="admin-access">Admin access</Button>
    </router-link>
  </section>

</main>
</template>

<style scoped>
.divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

h3 {
  text-align: center;
  margin-bottom: 0.7rem;
}
.admin-access {
  display: block;
  margin: auto;
}
</style>