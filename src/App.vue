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
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
/* variables */
:root {
  --navSize: 70px;
  // colors
  --green: #17AE82;
  --eventGreen: #0B503C;
  --orange: #ff7d00;
  --orange-faded: rgba(255, 242, 167, 0.4);
  --red: #C42338;
  --blue: #1e96fc;
  --blue-faded: rgba(167, 227, 255, 0.2);
  --navy: #001524;
  --grey: #999999;
  --grey-faded: #99999933;
  // formats
  --padding: 16px;
  --shadow: 0 0 6px 1px var(--grey);
  --header-height: 72px;
  --nunito: 'Nunito', sans-serif;
  --exo: 'Exo', sans-serif;
}

/* styles */
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  & * { font-family: var(--nunito); }
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
