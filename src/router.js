import { createRouter, createWebHistory } from 'vue-router';
import byStep from './views/by-step.vue';
import onShot from './views/on-shot.vue';
import congrats from './views/congrats.vue';

const routes = [
  { path: '/', name:'by-step', component: byStep },
  { path: '/onshot',name:'on-shot', component: onShot },
  { path: '/congrats', name:'congrats', component: congrats }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
