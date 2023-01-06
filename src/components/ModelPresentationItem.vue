<script setup lang="ts">
import { createUserPresentation } from '@/assets/ts/backend/routes';
import { Card, Button } from 'agnostic-vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: string,
  name: string
}>();

const router = useRouter();

async function createPresentationFromModel(){
  const presentationId = await createUserPresentation(props.id);
  router.push(`/editor/${presentationId.id}`);
}
</script>

<template>
<Button class="unstyled">
  <Card @click="createPresentationFromModel"  is-animated is-border is-rounded class="p8" >
    <p>{{ name }}</p>
  </Card>
</Button>

</template>

<style scoped>
.unstyled{
  background-color: transparent;
  border-width: 0;
  padding: 0;
}
</style>