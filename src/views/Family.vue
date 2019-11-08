<script>
import { mapState } from 'vuex';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import FamilyForm from '@/components/family/FamilyForm.vue';
import UserLogin from '@/components/family/UserLogin.vue';
import { Family, NewFamily } from '@/constants/authLevel.constants';

export default {
  data: () => ({
    display: {},
    title: '',
    isNew: false,
  }),

  computed: {
    ...mapState( ['authLevel', 'user'] ),
    ...mapState( 'users', ['users', 'newUser'] ),

    showLogin() {
      return this.authLevel === Family;
    },
  },

  beforeMount() {
    if (this.authLevel === NewFamily) {
      this.changeDisplay( 'firstUser' );
    } else if (this.authLevel === Family) {
      this.changeDisplay( this.users[0].name );
    }
  },

  methods: {
    changeDisplay( who ) {
      if (who === 'firstUser') {
        this.display = this.newUser;
        this.title = 'Add yourself!';
        this.isNew = true;
      } else if (who === 'newUser') {
        this.display = this.newUser;
        this.title = 'Add family member';
        this.isNew = true;
      } else {
        const user = this.users.find(u => u.name === who);
        this.display = user;
        this.title = user.name;
        this.isNew = false;
      }
    },
  },

  components: { ChevronRightIcon, FamilyForm, UserLogin },
};
</script>

<template>
  <div class="family">
    <section class="family-list">
      <div
        :key="user.id"
        v-for="user in users"
        :class="['user', { selected: user.name === display.name }]"
        @click="changeDisplay(user.name)"
      >
        {{ user.name }}
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
      <UserLogin v-if="showLogin" :displayedUser="display" />
      <FamilyForm v-else :title="title" :displayedUser="display" :isNew="isNew" />
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
