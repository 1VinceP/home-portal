<script>
import HouseIcon from 'vue-material-design-icons/Home.vue';
import ListIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import RewardIcon from 'vue-material-design-icons/Seal.vue';
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';

export default {
  name: 'base-nav',
  components: {
    HouseIcon, ListIcon, RewardIcon, CalendarIcon,
  },
};
</script>

<template>
  <div class="nav">
    <router-link to="/dashboard" class="icon-container">
      <HouseIcon :size="34" />
    </router-link>
    <router-link to="/calendar" class="icon-container">
      <CalendarIcon :size="34" />
    </router-link>
    <router-link to="/tasks" class="icon-container">
      <ListIcon :size="34" />
    </router-link>
    <router-link to="/store" class="icon-container">
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
    font-weight: bold;
    color: #2c3e50;
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
    cursor: pointer;
  }
}
</style>
