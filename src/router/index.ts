import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue"),
      props: { filter: 'active' }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/HomeView.vue'),
      props: { filter: 'archive' }
    },
    {
      path: '/ticket/:id',
      name: 'ticket-detail',
      component: () => import("@/views/TicketView.vue")
    },
    {
      path: '/agents',
      name: 'agent-manager',
      component: () => import("@/views/AgentManager.vue")
    }
  ]
});

export default router;