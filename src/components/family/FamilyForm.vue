<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
  Button, Collapsible, Input, Toggle, Modal,
} from '@/components';
import { NewFamily } from '@/constants/authLevel.constants';
import checkPermission from '@/utils/checkPermission';

export default {
  name: 'family-form',
  data: () => ({
    showDeleteModal: false,
  }),

  computed: {
    ...mapState( ['user', 'authLevel'] ),
    ...mapState( 'users', ['displayedUser', 'newUser', 'userChangesMade'] ),

    userObject() {
      return this.isNew ? this.newUser : this.displayedUser;
    },

    isSelf() {
      return this.user.id === this.userObject.id;
    },

    isNewFamily() {
      return this.authLevel === NewFamily;
    },

    showAuthToggles() {
      return (this.user.admin && !this.isSelf)
        || this.isNewFamily || this.isNew;
    },

    showPermissions() {
      return (this.user.admin && !this.isSelf)
        && !this.isNewFamily;
    },

    showDelete() {
      return this.user.admin && !this.userObject.admin && !this.isNew;
    },

    canSave() {
      return this.user.admin || this.isNew
        || (this.user.manager && !this.userObject.manager)
        || (this.isSelf);
    },

    userValidated() {
      return !!this.userObject.name && !!this.userObject.password
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
    if (this.isNewFamily) {
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

    permissionCheck( permission ) {
      return checkPermission( this.isSelf, permission );
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
      top
      :show="showDeleteModal"
      :title="`Delete ${userObject.name}?`"
      type="error"
      secondary="Cancel"
      primary="Delete"
      @onSecondary="showDeleteModal = false"
      @onPrimary="deleteUserMethod"
    >
      This action cannot be undone. <br />
      Are you sure you want to permanently delete {{ userObject.name }}?
    </Modal>

    <section class="grid">
      <div class="title">{{ title || userObject.name }}</div>
      <div class="grid-toggle">
        <Toggle
          sm
          v-show="showAuthToggles"
          name="admin"
          label="Admin"
          :checked="userObject.admin || isNewFamily"
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
          :checked="userObject.manager || isNewFamily"
          @change="edit"
          :disabled="!this.user.admin"
          red
        />
      </div>

      <div class="grid-image"><div /></div>

      <div class="grid-input">
        <Input
          name="name"
          label="Name"
          :readonly="!isNew && permissionCheck( 'Name' )"
          :value="userObject.name"
          @input="edit"
        />
      </div>
      <div class="grid-input">
        <Input
          name="password"
          label="Password"
          type="password"
          :readonly="!isNew && permissionCheck( 'Password' )"
          :value="userObject.password"
          @input="edit"
          autocomplete="off"
        />
      </div>
      <div class="grid-input">
        <Input
          type="number"
          name="points"
          label="Points"
          :readonly="!isNew && permissionCheck( 'Points' )"
          :value="userObject.points"
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
          :checked="userObject.permissions.ownName"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Password"
          name="ownPassword"
          :checked="userObject.permissions.ownPassword"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Image"
          name="ownImage"
          :checked="userObject.permissions.ownImage"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Settings"
          name="ownSettings"
          :checked="userObject.permissions.ownSettings"
          :disabled="userObject.admin"
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
          :checked="userObject.permissions.otherName"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Password"
          name="otherPassword"
          :checked="userObject.permissions.otherPassword"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Points"
          name="otherPoints"
          :checked="userObject.permissions.otherPoints"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Assign Tasks"
          name="assignTask"
          :checked="userObject.permissions.assignTask"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Assign Events"
          name="assignEvent"
          :checked="userObject.permissions.assignEvent"
          :disabled="userObject.admin"
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
      <div class="grid-toggle">
        <Toggle
          red
          label="Create Task"
          name="createTask"
          :checked="userObject.permissions.createTask"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Edit Task"
          name="editTask"
          :checked="userObject.permissions.editTask"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Edit Event"
          name="editEvent"
          :checked="userObject.permissions.editEvent"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Edit Reward"
          name="editReward"
          :checked="userObject.permissions.editReward"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Create Recipe"
          name="createRecipe"
          :checked="userObject.permissions.createRecipe"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
      <div class="grid-toggle">
        <Toggle
          red
          label="Edit Recipe"
          name="editRecipe"
          :checked="userObject.permissions.editRecipe"
          :disabled="userObject.admin"
          @change="editPermission"
        />
      </div>
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
