import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import tasks from './modules/tasks';
import rewards from './modules/rewards';
import calendar from './modules/calendar';

Vue.use( Vuex );

export default new Vuex.Store({
  state: {
    family: { id: null },
    user: { id: null },
  },

  getters: {
    isAuthenticated: state => (!!state.user.id && state.user.id >= 0)
      && (!!state.family.id && state.family.id >= 0),
    isFamily: state => (!!state.family.id && state.family.id >= 0),
  },

  mutations: {
    setFamily: ( state, family ) => {
      state.family = family;
      // if (family.users.length > 0) {
      //   state.user = family.users[0];
      // }
    },
  },

  actions: {
  },

  modules: {
    calendar,
    users,
    tasks,
    rewards,
  },
});
