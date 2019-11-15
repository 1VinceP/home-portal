import ky from 'ky';

const initialState = () => ({
  loading: false,
  tasks: [
    { id: 1, name: 'Dishes', reward: 200 },
    { id: 2, name: 'Feed animals', reward: 200 },
    { id: 3, name: 'Clear table', reward: 200 },
    { id: 4, name: 'Clean toilet', reward: 200 },
    { id: 5, name: 'Mow lawn', reward: 200 },
  ],
});

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

  actions: {
    async getTasks({ commit }) {
      try {
        const tasks = await ky.get( '/family/tasks' ).json();
        commit( 'setTasks', tasks );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
