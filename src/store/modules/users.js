import ky from 'ky';

export default {
  namespaced: true,

  state: [{
    id: null, name: '', isAdmin: false, isManager: false,
  }],

  getters: {},

  mutations: {
    setUsers( state, users ) {
      Object.assign( state, users );
    },
  },

  actions: {
    async createUser( { commit, rootState }, user ) {
      const { id: familyId } = rootState.family;

      const res = await ky.post( `/family/${familyId}/users`, { json: { user } } ).json();
      commit( 'users/setUsers', res );
    },
  },
};
