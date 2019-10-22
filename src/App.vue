<script>
import HouseIcon from 'vue-material-design-icons/Home.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';

export default {
  data: () => ({
    navOpen: false,
  }),

  methods: {
    handleNav() {
      this.navOpen = !this.navOpen;
    },
  },

  components: { HouseIcon, MenuIcon },
};
</script>

<template>
  <div id="app">
    <div :class="['nav', { 'nav-large': navOpen }]">
      <router-link to="/"><HouseIcon /></router-link>
      <!-- <button @click="handleNav()">{{ navOpen ? 'Close' : 'Open' }}</button> -->
      <MenuIcon class="menu" @click="handleNav()" />
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
/* variables */
:root {
  --navSize: 70px;
  // colors
  --orange: #ff7d00;
  --red: #78290f;
  --blue: #1e96fc;
  --navy: #001524;
  --grey: #999999;
  // formats
  --shadow: 0 0 6px 1px var(--grey);
}

#app {
  display: flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  & * { font-family: 'Open Sans', sans-serif; }
}

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
  &.nav-large {
    width: 300px;
  }
  & a {
    font-weight: bold;
    color: #2c3e50;
  }
  & a.router-link-exact-active {
    color: var(--blue);
  }
  & .menu {
    cursor: pointer;
  }
}

.page {
  min-height: 100vh;
  width: 100%;
  padding: 16px;
  padding-left: calc(var(--navSize) + 16px);
}
</style>
