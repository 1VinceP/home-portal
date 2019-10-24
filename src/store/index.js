import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
import User from './models/User';
import Reward from './models/Reward';

Vue.use( Vuex );

const database = new VuexORM.Database();
database.register( User );
database.register( Reward );

VuexORM.use( VuexORMGraphQL, { database } );

export default new Vuex.Store({
  plugins: [VuexORM.install( database )],

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
    setNewFamily: ( state, family ) => {
      state.family = family;
    },
    setFamily: ( state, family ) => {
      state.family = family;
      state.user = family.users[0];
    },
  },

  actions: {
  },

  modules: {
  },
});
