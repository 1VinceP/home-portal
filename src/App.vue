<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link>
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
/* variables */
// sizes
$navSize: 70px;
// colors
$orange: #ff7d00;
$red: #78290f;
$blue: #1e96fc;
$navy: #001524;
// formats
$shadow: 0 0 6px 1px #999;

#app {
  display: flex;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  height: 100vh;
  width: $navSize;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  position: fixed;
  // box-shadow: 0 0 6px 1px $navy;
  box-shadow: $shadow;
  & a {
    font-weight: bold;
    color: #2c3e50;
  }
  & a.router-link-exact-active {
    color: $blue;
  }
}

.page {
  min-height: 100vh;
  width: 100%;
}
</style>
