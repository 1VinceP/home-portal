<script>
import { mapGetters } from 'vuex';
import BaseNav from './components/Nav.vue';
import BaseHeader from './components/Header.vue';

export default {
  data: () => ({
    search: '',
  }),

  computed: {
    ...mapGetters(['isFamily']),
  },

  components: { BaseNav, BaseHeader },
};
</script>

<template>
  <div id="app">
    <BaseNav v-if="isFamily" />
    <div :class="['page', { 'auth-padding': isFamily }]">
      <BaseHeader v-if="isFamily" />
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
  padding: 16px;
  &.auth-padding {
    padding-left: calc(var(--navSize) + 16px);
  }
}
</style>
