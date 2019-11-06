const initialState = {
  loading: false,
  tasks: [{
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

    setTasks( state, tasks ) {
      state.tasks = tasks;
    },
  },

  actions: {},
};
