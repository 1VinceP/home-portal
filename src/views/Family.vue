<script>
import { mapState, mapMutations } from 'vuex';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import CrownIcon from 'vue-material-design-icons/Crown.vue';
import { Modal, Spinner } from '@/components';
import FamilyForm from '@/components/family/FamilyForm.vue';
import UserLogin from '@/components/family/UserLogin.vue';
import { Family, NewFamily, User } from '@/constants/authLevel.constants';

export default {
  data: () => ({
    title: '',
    isNew: false,
    modalOpen: false,
  }),

  computed: {
    ...mapState( ['authLevel', 'user'] ),
    ...mapState( 'users', ['loadingUsers', 'users', 'displayedUser', 'newUser'] ),

    showLogin() {
      return this.authLevel === Family;
    },
  },

  beforeMount() {
    if (this.authLevel === NewFamily) {
      this.changeDisplay( 'firstUser' );
      this.modalOpen = true;
    } else if (this.authLevel === Family || this.authLevel === User) {
      this.changeDisplay( this.users[0].name );
    }
  },

  methods: {
    ...mapMutations( 'users', ['setDisplayedUser'] ),

    resetIsNew() {
      this.title = '';
      this.isNew = false;
    },

    changeDisplay( who ) {
      if (who === 'firstUser') {
        this.setDisplayedUser( this.newUser );
        this.title = 'Add yourself!';
        this.isNew = true;
      } else if (who === 'newUser') {
        this.setDisplayedUser( this.newUser );
        this.title = 'Add family member';
        this.isNew = true;
      } else {
        const user = this.users.find(u => u.name === who);
        this.setDisplayedUser( user );
        this.title = user.name;
        this.isNew = false;
      }
    },
  },

  components: {
    ChevronRightIcon,
    CrownIcon,
    FamilyForm,
    UserLogin,
    Modal,
    Spinner,
  },
};
</script>

<template>
  <div class="family">
    <Modal
      top
      title="Hey there!"
      :show="modalOpen"
      @onPrimary="modalOpen = false"
    >
      Looks like this is your first time here. <br />
      Lets start by creating your first family member.
      This person will be an Admin, and will be able to do everything.
    </Modal>
    <Spinner v-show="loadingUsers" fill />

    <section class="family-list">
      <div
        :key="user.id"
        v-for="user in users"
        :class="['user', { selected: user.id === displayedUser.id && !isNew }]"
        @click="changeDisplay( user.name )"
      >
        <span class="name">
          <span
            v-show="user.admin || user.manager"
            :class="[
              'crown',
              {
                manager: user.manager && !user.admin,
                admin: user.admin,
              },
            ]"
          >
            <CrownIcon />
          </span>
          {{ user.name }}
        </span>
        <ChevronRightIcon class="arrow-right" />
      </div>
      <div
        v-show="user.admin || isNew"
        :class="['user', { selected: isNew }]"
        @click="changeDisplay( 'newUser' )"
      >
        + Add
        <ChevronRightIcon class="arrow-right" />
      </div>
    </section>

    <section class="details">
      <UserLogin v-if="showLogin" />
      <FamilyForm v-else :title="title" :isNew="isNew" :resetIsNew="resetIsNew" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.family {
  min-height: calc(100% - var(--header-height));
  width: 100%;
  display: flex;
}

.family-list {
  min-height: 100%;
  width: 300px;
  border-right: 1px solid var(--navy);
  & .user {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    color: var(--blue);
    cursor: pointer;
    &:hover .arrow-right {
      display: block;
    }
    &:hover, &.selected {
      background: #a7e3ff33;
    }
    &:last-child {
      color: var(--orange);
      &:hover, &.selected {
        background: #fff2a766;
      }
    }
    & .name {
      display: flex;
      align-items: center;
      & .crown {
        margin-right: 10px;
        &.manager { color: var(--orange); }
        &.admin { color: var(--red); }
      }
    }
  }
  & .arrow-right {
    display: none;
  }
}

.details {
  min-height: 100%;
  width: calc(100% - 300px);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  & .title {
    height: 60px;
    width: 100%;
    margin-bottom: 20px;
    color: var(--navy);
    font-size: 20px;
  }
}
</style>
