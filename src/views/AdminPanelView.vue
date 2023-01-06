<script setup lang="ts">
import type { User, UserMetaData } from '@/assets/ts/backend/interfaces';
import { deleteUser, getUserMetadata, getUsers } from '@/assets/ts/backend/routes';
import LogoVue from '@/components/icons/Logo.vue';
import { Pagination, usePagingGenerator } from 'agnostic-vue';
import { Button } from 'agnostic-vue';


const users: User[][] = [];
const userPerPage = 8;

let userMetadata : UserMetaData;
[userMetadata, users[1]] = await Promise.all([getUserMetadata(), getUsers(0, userPerPage)]);
const userPages = Math.ceil(userMetadata.count / userPerPage);

const { currentPaginationPage, paginationPages, handlePaginationUpdate } = usePagingGenerator(1, 1, userPages);

async function interceptPageUpdate(newPage: number) {
  if(users[newPage] === undefined){
    users[newPage] = await getUsers((newPage-1) * userPages, userPerPage);
  }
  // This takes care of updating the paging controls appropriately
  handlePaginationUpdate(newPage);
};

async function deleteUserFromList(userId: string){
  const result = await deleteUser(userId);

  //TODO remove the ref ?
}

</script>

<template>
<main class="main-content">
  <LogoVue />

  <h1>Admin panel</h1>
  
  <article>
    <h3>Users</h3>
    <ul>
      <li class="user" v-for="(user, index) in users[currentPaginationPage]">
        <div class="user-item">
          <p>{{user.email}}, {{user.permissions}}</p>
          <Button @click="deleteUserFromList(user.id)">Delete</Button>
        </div>
      </li>
    </ul>

    <Pagination 
      @update-page="interceptPageUpdate"
      :current="currentPaginationPage"
      :pages="paginationPages"
      justify="center"
      :is-first-last="false"
      :navigation-labels="{previous: '', next: ''}"
    />

  </article>

</main>

</template>

<style scoped>
.user-item {
  display: flex;
}

ul {  
  margin-bottom: 1rem;  
}

li.user { 
   margin-bottom: 0.4rem;  
}
</style>