<script>
import { mapState } from 'vuex';
import BaseNav from './components/Nav.vue';
import BaseHeader from './components/Header.vue';
import { Anonymous } from '@/constants/authLevel.constants';

export default {
  data: () => ({
    search: '',
  }),

  computed: {
    ...mapState(['authLevel']),

    showNav() {
      return this.authLevel !== Anonymous;
    },
  },

  components: { BaseNav, BaseHeader },
};
</script>

<template>
  <div id="app">
    <BaseNav v-if="showNav" />
    <div :class="['page', { 'auth-padding': showNav }]">
      <BaseHeader v-if="showNav" />
      <router-view />
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
  --padding: 16px;
  --shadow: 0 0 6px 1px var(--grey);
}

/* styles */
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  & * { font-family: 'Open Sans', sans-serif; }
}

.app-container {
  width: 100%;
}

.page {
  min-height: 100vh;
  width: 100%;
  // padding: 16px;
  &.auth-padding {
    padding-left: var(--navSize);
  }
}
</style>
