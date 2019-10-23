<script>
import Nav from './components/Nav.vue';
import Header from './components/Header.vue';

export default {
  data: () => ({
    search: '',
  }),

  components: { Nav, Header },
};
</script>

<template>
  <div id="app">
    <Nav />
    <div class="page">
      <Header />
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
  & * { font-family: 'Open Sans', sans-serif; }
}

.page {
  min-height: 100vh;
  width: 100%;
  padding: 16px;
  padding-left: calc(var(--navSize) + 16px);
}
</style>
