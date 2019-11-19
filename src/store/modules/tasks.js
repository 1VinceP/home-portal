import ky from 'ky';
import defaultTask from '@/constants/defaultTask';

const initialState = () => ({
  loading: false,
  tasks: [
    { id: 1, name: 'Dishes', reward: 200 },
    { id: 2, name: 'Feed animals', reward: 200 },
    { id: 3, name: 'Clear table', reward: 200 },
    { id: 4, name: 'Clean toilet', reward: 200 },
    { id: 5, name: 'Mow lawn', reward: 200 },
  ],
  displayTask: defaultTask(),
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

    resetDisplayTask( state ) {
      state.displayTask = defaultTask();
    },

    setTasks( state, tasks ) {
      state.tasks = tasks;
    },

    setTask( state, { task, taskId, newTask = false } ) {
      let taskToSet = task;
      if (newTask) {
        taskToSet = defaultTask();
      } else if (taskId >= 0) {
        taskToSet = state.tasks.find( t => t.id === taskId );
        state.displayTask = taskToSet;
      }
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
