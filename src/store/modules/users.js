import ky from 'ky';

const initialState = {
  loading: false,
  users: [
    { name: 'Adam' },
    { name: 'Steve' },
    { name: 'Jill' },
    { name: 'Rachel' },
  ],
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
    settings: {
      permissions: {
        canEditSelf: [],
        canEditChild: [],
      },
      accountSettings: {},
    },
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

    editUser( state, { prop, value } ) {
      state.user[prop] = value;
    },

    editUserSetting( state, { type, prop, value } ) {
      state.user.settings[type][prop] = value;
    },

    editNewUser( state, { prop, value }) {
      state.newUser[prop] = value;
    },

    editNewUserSetting( state, { type, prop, value } ) {
      state.newUser.settings[type][prop] = value;
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
