<script>
import { mapGetters } from 'vuex';
import HouseIcon from 'vue-material-design-icons/Home.vue';
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue';
import ListIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import RewardIcon from 'vue-material-design-icons/Seal.vue';
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';

export default {
  name: 'base-nav',

  computed: {
    ...mapGetters(['isAuthenticated']),

    disabled() {
      return !this.isAuthenticated;
    },
  },

  methods: {
    navigate(route) {
      if (!this.disabled) {
        this.$router.push(route);
      }
    },
  },

  components: {
    HouseIcon, AccountGroup, ListIcon, RewardIcon, CalendarIcon,
  },
};
</script>

<template>
  <div class="nav">
    <router-link
      to="/dashboard"
      :event="disabled ? '' : 'click'"
      :class="['icon-container', { disabled: disabled }]"
    >
      <HouseIcon :size="34" />
    </router-link>
    <router-link to="/family" :event="disabled ? '' : 'click'" class="icon-container">
      <AccountGroup :size="34" />
    </router-link>
    <router-link
      to="/calendar"
      :event="disabled ? '' : 'click'"
      :class="['icon-container', { disabled: disabled }]"
    >
      <CalendarIcon :size="34" />
    </router-link>
    <router-link
      to="/tasks"
      :event="disabled ? '' : 'click'"
      :class="['icon-container', { disabled: disabled }]"
    >
      <ListIcon :size="34" />
    </router-link>
    <router-link
      to="/rewards"
      :event="disabled ? '' : 'click'"
      :class="['icon-container', { disabled: disabled }]"
    >
      <RewardIcon :size="34" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  height: 100vh;
  width: var(--navSize);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  position: fixed;
  box-shadow: var(--shadow);
  transition: all .2s ease-in-out;
  & a {
    color: var(--navy);
  }
  & a.router-link-exact-active {
    &.icon-container {
      color: var(--blue);
    }
  }
  & .icon-container {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 26px;
    color: var(--navy);
    cursor: pointer;
    &.disabled {
      color: #aaa;
      cursor: default;
    }
  }
}
</style>
