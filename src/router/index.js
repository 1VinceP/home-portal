import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Family from '@/views/Family.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ( to, from, next ) => {
      const { getters: { isAuthenticated } } = store;
      if (isAuthenticated) {
        next( '/dashboard' );
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { protection: 'full' },
  },
  {
    path: '/family',
    name: 'family',
    component: Family,
    meta: { protection: 'basic' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(( to, from, next ) => {
  const { getters: { isAuthenticated, isFamily } } = store;

  if (to.meta.protection === 'full' && !isAuthenticated) {
    console.log('not authenticated');
    next({
      path: '/login',
      query: { redirectFrom: to.fullPath },
    });
  } else if (to.meta.protection === 'basic' && !isFamily) {
    console.log('not a family');
    next({
      path: '/login',
      query: { redirectFrom: to.fullPath },
    });
  }

  next();
});

export default router;
