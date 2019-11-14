import ky from 'ky';
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import { User, NewFamily } from '@/constants/authLevel.constants';
import defaultUser from '@/constants/defaultUser';

const initialState = () => ({
  loadingUsers: false,
  users: [],
  displayedUser: { ...defaultUser() },
  userChangesMade: false,
  newUser: { ...defaultUser() },
});

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    reset( state ) {
      const s = initialState();
      Object.keys( s ).forEach( key => { state[key] = s[key]; } );
    },

    resetNewUser( state ) {
      state.newUser = { ...defaultUser() };
    },

    setLoadingUsers( state, value ) {
      state.loadingUsers = value;
    },

    setUsers( state, users ) {
      state.users = users;
    },

    setDisplayedUser( state, user ) {
      state.displayedUser = { ...user };
      state.userChangesMade = false;
    },

    editUser( state, { prop, value } ) {
      state.displayedUser[prop] = value;
      state.userChangesMade = true;
      if (prop === 'admin' && value === true) state.displayedUser.manager = true;
      if (prop === 'manager' && value === false) state.displayedUser.admin = false;
    },

    editUserSetting( state, { type, prop, value } ) {
      state.displayedUser[type][prop] = value;
      state.userChangesMade = true;
    },

    editNewUser( state, { prop, value }) {
      state.newUser[prop] = value;
      if (prop === 'admin' && value === true) state.newUser.manager = true;
      if (prop === 'manager' && value === false) state.newUser.admin = false;
    },

    editNewUserSetting( state, { type, prop, value } ) {
      state.newUser[type][prop] = value;
    },

    assignAdminPerms( state, userType ) {
      console.log('assigning admin');
      const permissions = { ...defaultUser().permissions };
      Object.keys( permissions ).forEach(key => {
        state[userType].permissions[key] = true;
      });
    },

    removePerms( state, userType ) {
      console.log('removing perms');
      const permissions = { ...defaultUser().permissions };
      Object.keys( permissions ).forEach(key => {
        state[userType].permissions[key] = false;
      });
    },
  },

  actions: {
    async createUser( { state, rootState, commit }, oldAuth ) {
      const { newUser: user } = state;
      if (user.admin) commit( 'assignAdminPerms', 'newUser' );
      commit( 'setLoadingUsers', true );

      try {
        const users = await ky.post( '/family/users', { json: { user } } ).json();
        commit( 'setLoadingUsers', false );
        commit( 'setUsers', users );
        commit( 'resetNewUser' );
        if (rootState.authLevel === NewFamily) {
          commit( 'setAuthLevel', User, { root: true } );
          commit( 'setUser', users[0], { root: true } );
        } else {
          commit( 'setDisplayedUser', users[users.length - 1] );
        }

        if (oldAuth === NewFamily) router.push( '/dashboard' );
      } catch (error) {
        commit( 'setLoadingUsers', false );
      }
    },

    async updateUser( { state, commit } ) {
      const { displayedUser: user } = state;
      commit( 'setLoadingUsers', true );

      try {
        if (user.admin) commit( 'assignAdminPerms', 'displayedUser' );

        const users = await ky.put( '/family/users', { json: { user } } ).json();
        commit( 'setLoadingUsers', false );
        commit( 'setUsers', users );
        state.userChangesMade = false;
      } catch (error) {
        commit( 'setLoadingUsers', false );
      }
    },

    async deleteUser( { state, rootState, commit } ) {
      const { displayedUser: user } = state;
      commit( 'setLoadingUsers', true );

      try {
        const users = await ky.delete( `/family/users/${user.id}` ).json();

        commit( 'setLoadingUsers', false );
        commit( 'setUsers', users );
        commit( 'setDisplayedUser', rootState.user );
      } catch (error) {
        commit( 'setLoadingUsers', false );
      }
    },
  },
};
