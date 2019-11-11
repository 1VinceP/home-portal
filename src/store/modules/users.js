import ky from 'ky';
import { User } from '@/constants/authLevel.constants';

const initialState = {
  loading: false,
  users: [],
  displayedUser: {},
  newUser: {
    name: '',
    password: '',
    image: '',
    admin: false,
    manager: false,
    child: true,
    tasks: [],
    rewards: [],
    events: [],
    points: 0,
    permissions: {
      ownName: false,
      ownPassword: false,
      ownImage: false,
      ownSettings: false,
      otherName: false,
      otherPassword: false,
      otherPoints: false,
      assignTasks: false,
      assignEvents: false,
      createTask: false,
      editTask: false,
      editEvent: false,
      editReward: false,
      createRecipe: false,
      editRecipe: false,
    },
    accountSettings: {},
  },
};

export default {
  namespaced: true,

  state: initialState,

  getters: {},

  mutations: {
    reset( state ) {
      const s = initialState;
      Object.keys( s ).forEach( key => { state[key] = s[key]; } );
    },

    setUsers( state, users ) {
      state.users = users;
    },

    setDisplayedUser( state, user ) {
      state.displayedUser = user;
    },

    editUser( state, { id, prop, value } ) {
      const index = state.users.findIndex(u => u.id === id);
      state.users[index][prop] = value;
      if (prop === 'admin' && value === true) state.users[index].manager = true;
      if (prop === 'manager' && value === false) state.users[index].admin = false;
    },

    editUserSetting( state, { type, prop, value } ) {
      state.user[type][prop] = value;
    },

    editNewUser( state, { prop, value }) {
      state.newUser[prop] = value;
      if (prop === 'admin' && value === true) state.newUser.manager = true;
      if (prop === 'manager' && value === false) state.newUser.admin = false;
    },

    editNewUserSetting( state, { type, prop, value } ) {
      state.newUser[type][prop] = value;
    },

    assignAdmin( state, userType ) {
      console.log('assigning admin');
      const permissions = { ...initialState.newUser.permissions };
      Object.keys( permissions ).forEach(key => {
        state[userType].permissions[key] = true;
      });
    },
  },

  actions: {
    async createUser( { state, commit } ) {
      const { newUser: user } = state;

      const res = await ky.post( '/family/users', { json: { user } } ).json();
      commit( 'setAuthLevel', User, { root: true } );
      commit( 'setUser', user, { root: true } );
      commit( 'setUsers', res );

      return true;
    },

    async updateUser( { commit }, user ) {
      if (user.admin) commit( 'users/assignAdmin' );
    },
  },
};
