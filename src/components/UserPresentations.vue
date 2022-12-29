<script setup lang="ts">
import { Pagination, usePagingGenerator } from 'agnostic-vue';
import PresentationItemVue from './PresentationItem.vue';
import { getPresentationList, getPresentationMetadata } from '@/assets/ts/backend/routes';
import type { SimplePresentation } from '@/assets/ts/backend/interfaces';

const presentations: SimplePresentation[][] = [];
const presentationPerPage = 4;
let presentationMetadata;
[presentationMetadata, presentations[1]] = await Promise.all([getPresentationMetadata(), getPresentationList(1, presentationPerPage)]);
const presentationPages = Math.ceil(presentationMetadata.count / presentationPerPage)

const { currentPaginationPage, paginationPages, handlePaginationUpdate } = usePagingGenerator(1, 1, presentationPages);

async function interceptPageUpdate(newPage: number) {
  if(presentations[newPage] === undefined){
    presentations[newPage] = await getPresentationList((newPage-1) * presentationPerPage, presentationPerPage);
  }
  // This takes care of updating the paging controls appropriately
  handlePaginationUpdate(newPage);
};
</script>

<template>
<article class="user-presentations">
  <h2>Your presentations</h2>
  <ul >
    <li class="user-pres" v-for="(presentation, index) in presentations[currentPaginationPage]">
      <PresentationItemVue :id="presentation.id" :name="`${(index +1) +  ((currentPaginationPage-1) * presentationPerPage)} - ${presentation.name}`" />
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
</template>

<style scoped>

h2 {
  display: block;
  margin: auto;
  text-align: center;
}

.user-presentations {
  padding-left: 1rem;
  padding-right: 1rem;
}

ul {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  
  margin-bottom: 1rem;  
}

li.user-pres { 
   margin-bottom: 0.4rem;  
}

</style>