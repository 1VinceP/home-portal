const initialState = {
  calendar: [{
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

    setCalendar( state, calendar ) {
      state.calendar = calendar;
    },
  },

  actions: {},
};
