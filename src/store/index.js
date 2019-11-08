import Vue from 'vue';
import Vuex from 'vuex';

import usersModule from './modules/users';
import tasksModule from './modules/tasks';
import rewardsModule from './modules/rewards';
import calendarModule from './modules/calendar';

import { Anonymous } from '@/constants/authLevel.constants';
// import { NewFamily } from '../constants/authLevel.constants';

Vue.use( Vuex );

export default new Vuex.Store({
  state: {
    authLevel: Anonymous, // anonymous, new family, family, user
    family: { id: null, users: [] },
    user: { id: null },
  },

  getters: {},

  mutations: {
    setAuthLevel: ( state, auth ) => {
      state.authLevel = auth;
    },
    setFamily: ( state, { family, auth } ) => {
      state.family = family;
      state.authLevel = auth;
      // if (family.users.length > 0) {
      //   state.user = family.users[0];
      // }
    },
  },

  actions: {
    setFamily: ( { state, commit }, family ) => {
      const {
        calendar, rewards, tasks, users, ...rest
      } = family;

      state.family = rest;
      commit( 'calendar/setCalendar', calendar, { root: true } );
      commit( 'rewards/setRewards', rewards, { root: true } );
      commit( 'tasks/setTasks', tasks, { root: true } );
      commit( 'users/setUsers', users, { root: true } );
    },
  },

  modules: {
    calendar: calendarModule,
    rewards: rewardsModule,
    tasks: tasksModule,
    users: usersModule,
  },
});
