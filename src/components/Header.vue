<script>
import { mapState, mapActions } from 'vuex';
import startCase from 'lodash/startCase';
import { Input } from '@/components';
import { User } from '@/constants/authLevel.constants';

export default {
  name: 'base-header',
  data: () => ({
    search: '',
  }),

  computed: {
    ...mapState( ['authLevel', 'user'] ),
    showRight() { return this.authLevel === User; },
    title() { return startCase(this.$route.name); },
  },

  methods: {
    ...mapActions( ['signoutUser'] ),
    signout() {
      this.signoutUser();
      this.$router.push( '/family' );
    },
  },

  components: { Input },
};
</script>

<template>
  <header>
    <div class="title">{{ title }}</div>
    <span v-show="showRight" class="right">
      <Input v-model="search" hasButton />
      <div
        :class="['user', { admin: user.admin, manager: user.manager }]"
        @click="signout"
      >
        {{ user.name }}
      </div>
    </span>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-top: var(--padding);
  padding-right: var(--padding);
}

.title {
  padding-left: 16px;
  font-size: 36px;
  color: var(--navy);
}

.right {
  height: 30px;
  display: flex;
  align-items: center;
  & .user {
    height: 100%;
    background: var(--green);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    padding: 0 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    &.manager { background: var(--orange); }
    &.admin { background: var(--red); }
  }
}
</style>
