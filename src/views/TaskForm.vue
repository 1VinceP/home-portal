<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Button, Input } from '@/components';

export default {
  name: 'task-form',

  computed: {
    ...mapState( ['user'] ),
    ...mapState( 'tasks', ['displayTask'] ),
    canEditTask() { return this.user.permissions.editTask; },
  },

  beforeMount() {
    const taskId = Number(this.$route.params.taskId);
    if (taskId >= 0) this.setTask({ taskId });
    else this.setTask({ newTask: true });
  },

  methods: {
    ...mapMutations( 'tasks', ['setTask', 'editTask'] ),
    ...mapActions( 'tasks', ['updateTask'] ),

    edit( value, prop, type ) {
      let v = value;
      if (type === 'number') v = Number(v);
      this.editTask({ prop, value: v });
    },
  },

  components: { Button, Input },
};
</script>

<template>
  <div class="task-form">
    <div class="form">
      <Input
        label="Name"
        name="name"
        :value="displayTask.name"
        :validation="value => !!value"
        @input="edit"
      />
      <Input
        textarea
        label="Description"
        name="description"
        :value="displayTask.description"
        :validation="value => !!value"
        @input="edit"
      />
      <Input
        label="Reward"
        type="number"
        name="reward"
        :value="displayTask.reward"
        :validation="value => !!value"
        @input="edit"
      />

      <div class="buttons">
        <Button isDelete class="delete">Delete</Button>
        <Button primary @click="updateTask">Save</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-form {
  min-height: calc(100% - var(--header-height));
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & .delete { margin-right: 30px; }
}
</style>
