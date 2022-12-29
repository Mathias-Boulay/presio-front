import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import type { AuthMethod } from '@/assets/ts/utils/auth_utils';
import { useLocalStorage } from "@vueuse/core"


export const useUserStore = defineStore('user', () => {
  // Elements used for the auth to the backend
  const authMethod = ref(useLocalStorage<AuthMethod | undefined>('authMethod', undefined));
  const authToken = ref(useLocalStorage<string | undefined>('authToken', undefined));
  const endDate = ref(useLocalStorage<Number>('endDate', 0));

  function setAuth(method: AuthMethod, token: string){
    authMethod.value = method;
    authToken.value = token;
    
    // TODO adjust per IdP 
    // 3500 s ~ 1h
    endDate.value = Date.now() + 3500 * 1000;

    console.log(authMethod.value);
    console.log(authToken.value);
    console.log(endDate.value);
  }

  function isAuthenticated() {
    // Just check whether the auth has expired.
    console.log(typeof endDate.value)
    
    try {
      return endDate.value && Date.now() < endDate.value;
    }catch (error) {
      console.error(error);
      return false;
    }
  }

  
  return {
    setAuth, isAuthenticated,
    authMethod, authToken
  }
});