<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
  Button, Collapsible, Input, Toggle, Modal,
} from '@/components';
import { NewFamily } from '@/constants/authLevel.constants';

export default {
  name: 'family-form',
  data: () => ({
    showDeleteModal: false,
  }),

  computed: {
    ...mapState( ['user', 'authLevel'] ),
    ...mapState( 'users', ['displayedUser', 'newUser', 'userChangesMade'] ),

    showAuthToggles() {
      return (this.user.admin && this.user.id !== this.displayedUser.id)
        || this.authLevel === NewFamily || this.isNew;
    },

    autocheckAuthToggles() {
      return this.authLevel === NewFamily;
    },

    showPermissions() {
      return (this.user.admin && this.user.id !== this.displayedUser.id)
        && this.authLevel !== NewFamily;
    },

    showDelete() {
      return this.user.admin && !this.displayedUser.admin && !this.isNew;
    },

    canSave() {
      return this.user.admin || this.isNew
        || (this.user.manager && !this.displayedUser.manager)
        || (this.user.id === this.displayedUser.id);
    },

    userValidated() {
      return !!this.displayedUser.name && !!this.displayedUser.password
        && this.userChangesMade;
    },

    newUserValidated() {
      return !!this.newUser.name && !!this.newUser.password;
    },

    saveButtonSpecs() {
      return {
        label: this.isNew ? 'Create' : 'Update',
        disabled: this.isNew ? !this.newUserValidated : !this.userValidated,
      };
    },
  },

  mounted() {
    if (this.authLevel === NewFamily) {
      this.editNewUser({ prop: 'admin', value: true });
      this.editNewUser({ prop: 'manager', value: true });
    }
  },

  methods: {
    ...mapMutations('users', [
      'editUser',
      'editUserSetting',
      'editNewUser',
      'editNewUserSetting',
    ]),
    ...mapActions( 'users', ['createUser', 'updateUser', 'deleteUser'] ),

    edit( value, prop, type ) {
      let v = value;
      if (type === 'number') v = Number(v);
      if (this.isNew) {
        this.editNewUser({ prop, value: v });
      } else {
        this.editUser({ prop, value: v });
      }
    },

    editPermission( value, prop ) {
      if (this.isNew) {
        this.editNewUserSetting({ type: 'permissions', prop, value });
      } else {
        this.editUserSetting({ type: 'permissions', prop, value });
      }
    },

    saveUser() {
      if (this.newUserValidated && this.isNew) {
        this.createUser( this.authLevel );
        this.resetIsNew();
      } else if (this.userValidated) {
        this.updateUser();
      }
    },

    deleteUserMethod() {
      this.deleteUser();
      this.showDeleteModal = false;
    },
  },

  components: {
    Button, Collapsible, Input, Toggle, Modal,
  },

  props: {
    title: String,
    isNew: Boolean,
    resetIsNew: Function,
  },
};
</script>

<template>
  <div class="family-form">
    <Modal
      :show="showDeleteModal"
      :title="`Delete ${displayedUser.name}?`"
      type="error"
      secondary="Cancel"
      primary="Delete"
      @onSecondary="showDeleteModal = false"
      @onPrimary="deleteUserMethod"
    >
      This action cannot be undone. <br />
      Are you sure you want to permanently delete {{ displayedUser.name }}?
    </Modal>

    <section class="grid">
      <div class="title">{{ title || displayedUser.name }}</div>
      <div class="grid-toggle">
        <Toggle
          sm
          v-show="showAuthToggles"
          name="admin"
          label="Admin"
          :checked="displayedUser.admin || autocheckAuthToggles"
          @change="edit"
          :disabled="!this.user.admin"
          red
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          sm
          v-show="showAuthToggles"
          name="manager"
          label="Manager"
          :checked="displayedUser.manager || autocheckAuthToggles"
          @change="edit"
          :disabled="!this.user.admin"
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
          type="password"
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
      :cols="4"
      red
    >
      <div class="grid-toggle">
        <Toggle
          red
          label="Name"
          name="ownName"
          :checked="displayedUser.permissions.ownName"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Password"
          name="ownPassword"
          :checked="displayedUser.permissions.ownPassword"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Image"
          name="ownImage"
          :checked="displayedUser.permissions.ownImage"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Settings"
          name="ownSettings"
          :checked="displayedUser.permissions.ownSettings"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
    </Collapsible>

    <Collapsible
      v-show="showPermissions"
      label="Permissions"
      subtitle="Can edit others"
      :cols="3"
      red
    >
      <div class="grid-toggle">
        <Toggle
          red
          label="Name"
          name="otherName"
          :checked="displayedUser.permissions.otherName"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Password"
          name="otherPassword"
          :checked="displayedUser.permissions.otherPassword"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Points"
          name="otherPoints"
          :checked="displayedUser.permissions.otherPoints"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Assign Tasks"
          name="assignTasks"
          :checked="displayedUser.permissions.assignTask"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Assign Events"
          name="assignEvents"
          :checked="displayedUser.permissions.assignEvent"
          :disabled="displayedUser.admin"
          @change="editPermission"
        />
      </div>
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
      <Button v-show="showDelete" red class="delete" @click="showDeleteModal = true">Delete</Button>
      <Button primary @click="saveUser" :disabled="saveButtonSpecs.disabled">
        {{ saveButtonSpecs.label }}
      </Button>
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
  & .delete {
    margin-right: 30px;
  }
}
</style>
