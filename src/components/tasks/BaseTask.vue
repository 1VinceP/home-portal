<script>
import AddTaskIcon from 'vue-material-design-icons/PlaylistPlus.vue';

export default {
  name: 'base-task',

  computed: {
    assignTask() { return this.user.permissions.assignTask; },
    deleteTask() { return this.user.admin; },
    userHasTask() { return this.user.tasks.find(tId => tId === this.task.id) >= 0; },
  },

  methods: {
    handleAdd() { this.$router.push('/tasks/create'); },
    handleTaskClick() { this.$router.push(`/tasks/${this.task.id}`); },
  },

  components: { AddTaskIcon },

  props: {
    task: Object,
    add: Boolean,
  },
};
</script>

<template>
  <div class="task">
    <div v-if="add" class="add" @click="handleAdd">
      <AddTaskIcon :size="120" />
      Create Task
    </div>

    <div v-else class="container" @click="handleTaskClick">
      <section class="header">
        <span class="title">{{ task.name }}</span>
        <span class="reward">{{ task.reward }}</span>
      </section>

      <section class="body">
        <div>{{ task.description }}</div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task {
  height: 300px;
  width: 300px;
  box-shadow: var(--shadow);
  border-radius: 3px;
  cursor: pointer;
  transition: all .2s ease;
  &:hover { transform: translateY(-6px); }
  & .add {
    height: 100%;
    width: 100%;
    background: var(--green);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    color: #fff;
    font-size: 18px;
    // var(--green), but lighten isn't working with variables
    &:hover { background: lighten(#17AE82, 2%); }
    &:active { background: var(--green); }
  }

  & .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 5px solid var(--eventGreen);
    &:hover {
      border-color: lighten(#0B503C, 5%);
      & .header { background: lighten(#0B503C, 5%); }
    }
    & .header {
      height: 40px;
      width: 100%;
      background: var(--eventGreen);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      color: #fff;
      & .title { font-size: 18px; }
    }
    & .body {
      height: 260px;
      width: 100%;
    }
  }
}
</style>
