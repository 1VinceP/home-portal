import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/no-cycle
import usersModule from './modules/users';
import tasksModule from './modules/tasks';
import rewardsModule from './modules/rewards';
import calendarModule from './modules/calendar';

import defaultUser from '@/constants/defaultUser';
import { Anonymous, Family, User } from '@/constants/authLevel.constants';

Vue.use( Vuex );

const initialState = () => ({
  authLevel: Anonymous, // anonymous, new family, family, user
  user: { ...defaultUser },

  family: { id: null },
  loadingFamily: false,
  loadingFamilyError: '',
});

export default new Vuex.Store({
  state: initialState,

  getters: {},

  mutations: {
    reset: ( state ) => {
      const s = initialState();
      Object.keys(s).forEach( key => { state[key] = s[key]; } );
    },

    setAuthLevel: ( state, auth ) => {
      state.authLevel = auth;
    },
    setUser: ( state, user ) => {
      state.user = user;
      state.authLevel = User;
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
      // commit( 'tasks/setTasks', tasks, { root: true } );
      commit( 'users/setUsers', users, { root: true } );
    },

    signoutUser: ({ commit }) => {
      commit( 'setUser', { id: null } );
      commit( 'setAuthLevel', Family );
    },
  },

  modules: {
    calendar: calendarModule,
    rewards: rewardsModule,
    tasks: tasksModule,
    users: usersModule,
  },
});
