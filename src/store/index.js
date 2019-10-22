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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
