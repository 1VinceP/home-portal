const initialState = {
  loading: false,
  rewards: [{
    id: null, name: '',
  }],
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

    setRewards( state, rewards ) {
      state.rewards = rewards;
    },
  },

  actions: {},
};
