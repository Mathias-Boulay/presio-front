import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditorViewVue from '@/views/EditorView.vue'
import PresentationsView from '@/views/PresentationsView.vue'
import { useUserStore } from '@/stores/user';
import AdminPanelView from '@/views/AdminPanelView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: EditorViewVue
    },
    {
      path: '/presentations',
      name: 'presentations',
      component: PresentationsView
    },
    {
      path: '/administration',
      name: 'administration',
      component: AdminPanelView
    }
  ]
});


// Handle whether the user is authenticated to redirect him
router.beforeEach(async (to, from) => {
  const store = useUserStore();
  console.log(store);
  if (!store.isAuthenticated() && to.name !== 'home'){
    return { name: 'home' }
  }
  if(!store.isAuthenticated('PERM_ADMIN') && to.name === 'administration'){
    return { name: 'home'};
  }
})

export default router
