import ky from 'ky';
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import defaultTask from '@/constants/defaultTask';

const initialState = () => ({
  loadingTasks: false,
  tasks: [],
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

    setLoadingTasks( state, value ) {
      state.loadingTasks = value;
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

    editTask( state, { prop, value } ) {
      state.displayTask[prop] = value;
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

    async updateTask({ state, commit }) {
      const { displayTask: task } = state;
      commit( 'setLoadingTasks', true );

      try {
        const tasks = await ky.put( '/family/tasks', { json: { task } } ).json();
        commit( 'setLoadingTasks', false );
        commit( 'setTasks', tasks );
        router.push( '/tasks' );
      } catch (error) {
        commit( 'setLoadingTasks', false );
      }
    },
  },
};
