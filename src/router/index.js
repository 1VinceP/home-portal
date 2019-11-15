import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-cycle
import store from '@/store';

import EmptyRouterView from '@/components/EmptyRouterView.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Family from '@/views/Family.vue';
import Tasks from '@/views/Tasks.vue';
import TaskForm from '@/views/TaskForm.vue';

import * as AuthLevel from '@/constants/authLevel.constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ( to, from, next ) => {
      const { state: { authLevel } } = store;
      switch (authLevel) {
        case AuthLevel.User:
          next( '/dashboard' );
          break;
        case AuthLevel.NewFamily:
        case AuthLevel.Family:
          next( '/family' );
          break;
        default:
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
  {
    path: '/calendar',
    name: 'calendar',
    meta: { protection: 'full' },
  },
  {
    path: '/tasks',
    component: EmptyRouterView,
    children: [
      {
        path: '',
        name: 'tasks',
        component: Tasks,
        meta: { protection: 'full' },
      },
      {
        path: 'create',
        name: 'create task',
        component: TaskForm,
        meta: { protection: 'full' },
      },
      {
        path: ':taskId',
        name: 'task',
        component: TaskForm,
        meta: { protection: 'full' },
      },
    ],
  },
  {
    path: '/rewards',
    name: 'rewards',
    meta: { protection: 'full' },
  },
  {
    path: '/settings',
    name: 'settings',
    meta: { protection: 'full' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(( to, from, next ) => {
  const { state: { authLevel } } = store;

  if (to.meta.protection === 'full' && authLevel !== AuthLevel.User) {
    if (authLevel === AuthLevel.Family || authLevel === AuthLevel.NewFamily) {
      next( '/family' );
    } else {
      console.log( 'not authenticated' );
      next({
        path: '/login',
        query: { redirectFrom: to.fullPath },
      });
    }
  } else if (to.meta.protection === 'basic' && authLevel === AuthLevel.Anonymous) {
    next({
      path: '/login',
      query: { redirectFrom: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
