<script>
import { mapState } from 'vuex';
import Task from '@/components/tasks/BaseTask.vue';

export default {
  name: 'tasks',

  computed: {
    ...mapState( ['user'] ),
    ...mapState( 'tasks', ['tasks'] ),
  },

  components: { Task },
};
</script>

<template>
  <div class="tasks">
    <Task v-show="user.permissions.createTask" add />
    <Task
      v-for="(task, i) in tasks"
      :key="i"
      :task="task"
      :user="user"
    />
  </div>
</template>

<style lang="scss" scoped>
.tasks {
  min-height: calc(100% - var(--header-height));
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-template-rows: repeat(auto-fit, 300px);
  justify-content: center;
  grid-gap: 36px;
  padding-top: 30px;
}
</style>
