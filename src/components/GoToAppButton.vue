<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { CallbackTypes } from "vue3-google-login";
import { Button } from 'agnostic-vue';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const router = useRouter();

/** Called when the IdP authentication is done */
const callback: CallbackTypes.TokenResponseCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Credential JWT string", response);
  userStore.setAuth('GOOGLE', response.access_token);

  goToApp();
};

function goToApp(){
  router.push('/presentations');
}

</script>

<template>
<GoogleLogin v-if="!userStore.isAuthenticated()" popup-type="TOKEN" :callback="callback">
  <Button>Login Using Google</button>
</GoogleLogin>

<Button v-else  @click="goToApp()">Go to the app</Button>
</template>

<style scoped>

</style>