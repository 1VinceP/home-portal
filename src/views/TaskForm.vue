<script>
import { Button, Input } from '@/components';

export default {
  name: 'task-form',
  data: () => ({
    name: '',
    description: '',
    repeats: false,
  }),

  computed: {
    editTask() { return this.user.permissions.editTask; },
    // bg() {
    //   const { taskId } = this.$route.params;
    //   return { background: taskId ? '#0f0' : '#f0f' };
    // },
  },

  components: { Button, Input },
};
</script>

<template>
  <div class="task-form">
    <Input
      v-model="name"
      label="Name"
    />
    <Input
      textarea
      v-model="description"
      label="Description"
    />

    <div class="buttons">
      <Button red>Delete</Button>
      <Button primary>Save</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
