import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import type { AuthMethod } from '@/assets/ts/utils/auth_utils';
import { useLocalStorage } from "@vueuse/core"
import { createUser, getUser } from '@/assets/ts/backend/routes';


export const useUserStore = defineStore('user', () => {
  // Elements used for the auth to the backend
  const authMethod = ref(useLocalStorage<AuthMethod | undefined>('authMethod', undefined));
  const authToken = ref(useLocalStorage<string | undefined>('authToken', undefined));
  const endDate = ref(useLocalStorage<Number>('endDate', 0));
  const permissions = ref(useLocalStorage<Array<String>>('permissions', []));

  async function setAuth(method: AuthMethod, token: string){
    authMethod.value = method;
    authToken.value = token;
    
    // Attempt to create the user, no op if the user is created
    await createUser();

    // Gather permissions from server
    permissions.value = (await getUser()).permissions;
    
    // TODO adjust per IdP 
    // 3500 s ~ 1h
    endDate.value = Date.now() + 3500 * 1000;

    console.log(authMethod.value);
    console.log(authToken.value);
    console.log(endDate.value);
  }

  function isAuthenticated(permission: string | undefined = undefined) {
    // Just check whether the auth has expired.
    console.log(typeof endDate.value)
    
    try {
      const isAuthenticated = endDate.value && Date.now() < endDate.value;
      if(permission){
        return isAuthenticated && permissions.value.includes(permission);
      }

      return isAuthenticated;
    }catch (error) {
      console.error(error);
      return false;
    }
  }

  function hasPerm(permission: string): boolean{
    return permissions.value.includes(permission);
  }

  
  return {
    setAuth, isAuthenticated, hasPerm,
    authMethod, authToken, permissions
  }
});