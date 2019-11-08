<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
  Button, Collapsible, Input, Toggle,
} from '@/components';

export default {
  name: 'family-form',
  data: () => ({}),

  computed: {
    ...mapState(['user', 'authLevel']),

    showPermissions() {
      return !this.isNew && this.displayedUser.admin && this.user.id !== this.displayedUser.id;
    },

    canSave() {
      return this.user.admin || this.isNew
        || (this.user.manager && !this.displayedUser.manager)
        || (this.user.id === this.displayedUser.id);
    },

    validated() {
      return !!this.displayedUser.name
        && !!this.displayedUser.password;
    },
  },

  mounted() {
    if (this.isNew) {
      this.editNewUser({ prop: 'admin', value: true });
      this.editNewUser({ prop: 'manager', value: true });
      this.assignAdmin( 'newUser' );
    }
  },

  methods: {
    ...mapMutations( 'users', ['editUser', 'editNewUser', 'assignAdmin'] ),
    ...mapActions( 'users', ['createUser'] ),

    edit( value, prop, type ) {
      let v = value;
      if (type === 'number') v = Number(v);
      if (this.isNew) {
        this.editNewUser({ prop, value: v });
      } else {
        this.editUser({ prop, value: v });
      }
    },

    async saveUser() {
      if (this.validated) {
        const isCreated = await this.createUser();
        if (isCreated) this.$router.push( '/dashboard' );
      }
    },
  },

  components: {
    Button, Collapsible, Input, Toggle,
  },

  props: ['displayedUser', 'isNew', 'title'],
};
</script>

<template>
  <div class="family-form">
    <section class="grid">
      <div class="title">{{ title }}</div>
      <div class="grid-toggle">
        <Toggle
          v-show="showPermissions || isNew"
          name="admin"
          label="Admin"
          :checked="displayedUser.admin"
          @change="edit"
          :disabled="isNew"
          red
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          v-show="showPermissions || isNew"
          name="manager"
          label="Manager"
          :checked="displayedUser.manager"
          @change="edit"
          :disabled="isNew"
          red
        />
      </div>

      <div class="grid-image"><div /></div>

      <div class="grid-input">
        <Input name="name" label="Name" :value="displayedUser.name" @input="edit" />
      </div>
      <div class="grid-input">
        <Input
          name="password"
          label="Password"
          :value="displayedUser.password"
          @input="edit"
          autocomplete="off"
        />
      </div>
      <div class="grid-input">
        <Input
          type="number"
          name="points"
          label="Points"
          :value="displayedUser.points"
          @input="edit"
        />
      </div>
    </section>

    <Collapsible label="Tasks" green />

    <Collapsible label="Events" green />

    <Collapsible
      v-show="showPermissions"
      label="Permissions"
      subtitle="Can edit self"
      :cols="3"
      red
    >
      <div class="grid-toggle"><Toggle red label="Name" /></div>
      <div class="grid-toggle"><Toggle red label="Password" /></div>
      <div class="grid-toggle"><Toggle red label="Image" /></div>
      <div class="grid-toggle"><Toggle red label="Settings" /></div>
    </Collapsible>

    <Collapsible
      v-show="showPermissions"
      label="Permissions"
      subtitle="Can edit others"
      :cols="3"
      red
    >
      <div class="grid-toggle"><Toggle red label="Name" /></div>
      <div class="grid-toggle"><Toggle red label="Password" /></div>
      <div class="grid-toggle"><Toggle red label="Points" /></div>
      <div class="grid-toggle"><Toggle red label="Assign Tasks" /></div>
      <div class="grid-toggle"><Toggle red label="Assign Events" /></div>
    </Collapsible>

    <Collapsible
      v-show="showPermissions"
      label="Permissions"
      subtitle="Family Management"
      :cols="3"
      red
    >
      <div class="grid-toggle"><Toggle red label="Create Task" /></div>
      <div class="grid-toggle"><Toggle red label="Edit Task" /></div>
      <div class="grid-toggle"><Toggle red label="Edit Event" /></div>
      <div class="grid-toggle"><Toggle red label="Edit Reward" /></div>
      <div class="grid-toggle"><Toggle red label="Create Recipe" /></div>
      <div class="grid-toggle"><Toggle red label="Edit Recipe" /></div>
    </Collapsible>

    <section v-show="canSave" class="footer">
      <Button primary @click="saveUser" :disabled="!validated">Save</Button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.family-form {
  width: 100%;
  & .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 36px;
    & .title {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: var(--navy);
    }
    & .grid-image {
      grid-row: 2 / span 3;
      display: flex;
      justify-content: center;
      align-items: center;
      & div {
        height: 200px;
        width: 200px;
        background: var(--grey);
        border-radius: 10px;
      }
    }
    & .grid-input {
      width: 100%;
      grid-column: 2 / span 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.grid-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 36px;
  padding: 0 30px;
}
</style>
